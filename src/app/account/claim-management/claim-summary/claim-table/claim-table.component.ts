import { JobDetailInterface } from './../../interface/job-detail.interface';
import { Router } from '@angular/router';
import { Component, OnInit, Input, ViewChildren, QueryList } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Claim } from '../../model/claims.model';
import { Subject, BehaviorSubject } from 'rxjs';
import { JobStatus, LinkText } from '../../model/claims.enums';
import { environment } from 'src/environments/environment';
import { SortableHeaderDirective } from 'src/app/core/directive/sortable-header.directive';
import { SortDirectionEnums } from 'src/app/core/enums/sort-direction.enums';
import { SortEventInterface } from 'src/app/core/interface/sort-event.interface';
import { WindowRefAbstract } from 'src/app/core/window-ref.abstract.service';
import { DiagnosisSelectModalComponent } from '../../diagnosis/diagnosis-select-modal/diagnosis-select-modal.component';
import { ClaimServiceAbstract } from '../../service/abstract/claim.abstract.service';

@Component({
  selector: 'app-claim-table',
  templateUrl: './claim-table.component.html',
  styleUrls: ['./claim-table.component.scss']
})
export class ClaimTableComponent implements OnInit {
  @Input() public claimSubject$?: BehaviorSubject<
    Claim[]
  > = new BehaviorSubject([]);
  @Input() public completedSubject$?: BehaviorSubject<
    boolean
  > = new BehaviorSubject(false);
  @Input() public searchedClaimSubject$?: BehaviorSubject<
    Claim[]
  > = new BehaviorSubject([]);
  @Input() public error$: Subject<boolean> = new Subject();

  @ViewChildren(SortableHeaderDirective) headers: QueryList<SortableHeaderDirective>;

  public isError: boolean;
  public isCompleted: boolean;
  public claims: Claim[] = [];
  public page: number;
  public pageSize: number;
  public collectionSize: number = 0;
  public pageList: number[] = [2, 4, 6, 8];

  public claimListSubject: Subject<any> = new Subject();
  public completionSubject: Subject<boolean> = new Subject();
  public loading: boolean = true;
  public authorizeInvoiceLinkText = 'authorize / invoice';
  public claimsFound: boolean = true;
  public noInfoText: string;
  public authorizeUrl$: BehaviorSubject<string> = new BehaviorSubject(null);
  public JobStatus = JobStatus;

  constructor(
    private _claimService: ClaimServiceAbstract,
    private _windowRefService: WindowRefAbstract,
    private _modalService: NgbModal,
    private _router: Router
  ) {}

  ngOnInit() {
    this.noInfoText = `Please contact Contractor Relations at ${environment.core.customerServiceNumber} for assistance.`;
    this.claimSubject$.subscribe((claimData: Claim[]) => {
      this.claims = claimData;
      this.collectionSize = this.claims.length;
      this.pageSize = this._getPageSize(this.collectionSize);
      this.claims.length > 0
        ? (this.claimsFound = true)
        : (this.claimsFound = false);
      this._sortList('dateRequested', SortDirectionEnums.Descending);
    });

    this.completedSubject$.subscribe((completed: boolean) => {
       this.isCompleted = completed;
    });
    this.error$.subscribe((error: boolean) => this.isError = error);
    this.searchedClaimSubject$.subscribe((claimData: Claim[]) => {
      this.claims = claimData;
      this.collectionSize = this.claims.length;
      this.claims.length > 0
        ? (this.claimsFound = true)
        : (this.claimsFound = false);
      this.pageSize = this._getPageSize(this.collectionSize);
    });
    this.page = 1;
    this.pageSize = this._getPageSize(this.collectionSize);
  }

  public modifiedClaims(): Claim[] {
    return this.claims.slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize
    );
  }

  public authorizeInvoice(jobNumber: string, vendorId: string): void {
    const authPortal = this._windowRefService.window.open('', '_blank');
    authPortal.document.write('Loading Invoice Portal, Please Wait ......');

    this.loading = true;
    const completion$: Subject<boolean> = new Subject<boolean>();
    const error$: Subject<boolean> = new Subject();
    const errorMessage$: Subject<string> = new Subject();
    this._claimService.authInvoiceRedirect(
      jobNumber,
      vendorId,
      this.authorizeUrl$,
      completion$,
      error$,
      errorMessage$
    );

    completion$.subscribe((completed: boolean) => {
      completed ? this.loading = false : this.loading = true;
      if (!this.loading) {
        this.authorizeUrl$.subscribe((url: string) => {
          this._sendToPortal(authPortal, url);
        });
      }
    });
  }

  public diagnoseJob(
    vendorId: string,
    jobNumber: string,
    dateRequested: Date,
    customerContactPhone: string
  ): void {
    const jobDetail: JobDetailInterface = {
      vendorId: vendorId,
      jobNumber: jobNumber,
      dateRequested: dateRequested,
      customerContactPhone: customerContactPhone
    };
    this._claimService.setJobDetail(jobDetail);
    const modalRef: NgbModalRef = this._modalService.open(DiagnosisSelectModalComponent);
    modalRef.result.then((formType: string) => {
      if (formType) {
        this._router.navigate([
          '/account/claim/diagnosis',
          formType
        ]).then(() => {
          window.scroll(0, 0);
        });
      }
    });
  }

  public authorizeLinkText(jobStatus: JobStatus): string {
    return jobStatus === JobStatus.authorized
      ? LinkText.complete
      : jobStatus === JobStatus.wip
      ? LinkText.authorize
      : jobStatus === JobStatus.completed
      ? LinkText.invoiced
      : jobStatus === JobStatus.pendingAuthorization ?
      LinkText.authorize : '';
  }

  public diagnoseLinkText(jobStatus: JobStatus): string {
    return jobStatus === JobStatus.wip
      ? LinkText.diagnosis : '';
  }

  public onSort(sort: SortEventInterface) {
    if (!this.headers || !this.claimsFound) {
      return;
    }

    this.headers.forEach(header => {
      if (header.appSortable !== sort.column) {
        header.direction = SortDirectionEnums.None;
      }
    });

    this._sortList(sort.column, sort.direction);
  }

  private _sortList(
    column: string,
    direction: string
  ): void {
    if (direction !== SortDirectionEnums.None && column !== '') {
      this.claims = this.claims.sort((a: Claim, b: Claim) => {
        const result = this._compareString(`${a[column]}`, `${b[column]}`);
        return direction === SortDirectionEnums.Ascending ? result : -result;
      });
    }
  }

  private _sendToPortal(authPortal: any, url: string): void {
    authPortal.location.href = url;
  }

  private _getPageSize(claimsAmount: number): number {
    return claimsAmount > 150 ? 20 : 10;
  }

  private _compareString (v1?: string, v2?: string) {
    return (v1 < v2) ? -1 : (v1 > v2) ? 1 : 0;
  }
}
