import { Router } from '@angular/router';
import { Component, OnInit, Input, ViewChildren, QueryList, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Claim } from '../../model/claims.model';
import { Subject, BehaviorSubject } from 'rxjs';
import { JobStatus, LinkText, RevenueOrMaintenceIndicatorEnums } from '../../model/claims.enums';
import { environment } from 'src/environments/environment';
import { SortableHeaderDirective } from 'src/app/core/directive/sortable-header.directive';
import { SortDirectionEnums } from 'src/app/core/enums/sort-direction.enums';
import { SortEventInterface } from 'src/app/core/interface/sort-event.interface';
import { WindowRefAbstract } from 'src/app/core/window-ref.abstract.service';
import { DiagnosisSelectModalComponent } from '../../diagnosis/diagnosis-select-modal/diagnosis-select-modal.component';
import { ClaimServiceAbstract } from '../../service/abstract/claim.abstract.service';
import { JobDetailInterface } from './../../interface/job-detail.interface';
import { SearchFormValues } from 'src/app/shared/models/search-form-values.interface';

@Component({
  selector: 'app-claim-table',
  templateUrl: './claim-table.component.html',
  styleUrls: ['./claim-table.component.scss']
})
export class ClaimTableComponent implements OnInit, OnChanges {
  @Input() public claimSubject$?: BehaviorSubject<Claim[]> = new BehaviorSubject([]);
  @Input() public completedSubject$?: BehaviorSubject<boolean> = new BehaviorSubject(false);
  @Input() public searchedClaimSubject$?: BehaviorSubject<
    Claim[]
  > = new BehaviorSubject([]);
  @Input() public error$: Subject<boolean> = new Subject();
  @Input() public searchFormValue?: SearchFormValues;
  @ViewChildren(SortableHeaderDirective) headers: QueryList<SortableHeaderDirective>;

  public isError: boolean;
  public isCompleted: boolean;
  public claims: Claim[] = [];
  public page: number;
  public pageSize: number;
  public collectionSize: number = 0;
  public pageList: number[] = [2, 4, 6, 8];
  public authorizingJobNumber: string;
  public authorizingJobStatus: string;
  public claimListSubject: Subject<any> = new Subject();
  public completionSubject: Subject<boolean> = new Subject();
  public loading: boolean = false;
  public authorizeInvoiceLinkText = 'authorize / invoice';
  public claimsFound: boolean = true;
  public noInfoText: string;
  public JobStatus = JobStatus;
  public LinkText = LinkText;

  constructor(
    private _claimService: ClaimServiceAbstract,
    private _windowRefService: WindowRefAbstract,
    private _modalService: NgbModal,
    private _router: Router
  ) { }

  public ngOnChanges(change: SimpleChanges): void {
    this.noInfoText = this.noClaimsMsg;
  }

  public ngOnInit(): void {
    this.noInfoText = this.noClaimsMsg;
    this.claimSubject$.subscribe((claimData: Claim[]) => {
      this.claims = this._claimService.getClaimInDateRange(claimData);
      this.collectionSize = this.claims.length;
      this.pageSize = this._getPageSize(this.collectionSize);
      this.claims.length > 0
        ? (this.claimsFound = true)
        : (this.claimsFound = false);
      this._sortList('dateRequested', SortDirectionEnums.Descending, this.claims);
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
      this._sortList('dateRequested', SortDirectionEnums.Descending, this.claims);
      this.pageSize = this._getPageSize(this.collectionSize);
    });
    this.page = 1;
    this.pageSize = this._getPageSize(this.collectionSize);
  }

  public get noClaimsMsg(): string {
    return this.noInfoText = `There are no claims for the selected timeframe ${this.searchFormValue ? this.getStartDateSearched(this.searchFormValue) : null} ${this.searchFormValue ? this.getEndDateSearched(this.searchFormValue) : null}${this.searchFormValue ? this.getNameSearched(this.searchFormValue) : null} ${this.searchFormValue ? this.getJobIdSearched(this.searchFormValue) : null} ${this.searchFormValue ? this.getAddressSearched(this.searchFormValue) : null} ${this.searchFormValue ? this.getClaimTypeSearched(this.searchFormValue) : null}`;
  }

  public getStartDateSearched(formValues: SearchFormValues): string {
    return formValues.startDate ? `with start date: ${formValues.startDate}` : '';
  }

  public getEndDateSearched(formValues: SearchFormValues): string {
    return formValues.endDate ? `and end date: ${formValues.endDate}` : '';
  }

  public getNameSearched(formValues: SearchFormValues): string {
    return formValues.name ? `, with the name of: ${formValues.name}` : '';
  }

  public getJobIdSearched(formValues: SearchFormValues): string {
    return formValues.jobId ? `and jobId: ${formValues.jobId}` : '';
  }

  public getAddressSearched(formValues: SearchFormValues): string {
    return formValues.address ? `and address: ${formValues.address}` : '';
  }

  public getClaimTypeSearched(formValues: SearchFormValues): string {
    return formValues.type ? `and claim type of: ${formValues.type}` : '';
  }

  public modifiedClaims(): Claim[] {
    return this.claims.slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize
    );
  }

  public showRevenueAndMaintenaceIndicators(claim: Claim): string {
    return claim.isPrepaidMaintenance ? RevenueOrMaintenceIndicatorEnums.PPM : claim.isRevShare ? RevenueOrMaintenceIndicatorEnums.RS : '';
  }

  public authorizeInvoice(jobNumber: string, jobStatus: string, vendorId: string): void {
    this.authorizingJobNumber = jobNumber;
    this.authorizingJobStatus = jobStatus;
    this.loading = true;
    const completion$: Subject<boolean> = new Subject<boolean>();
    const error$: Subject<boolean> = new Subject();
    const authorizeUrl$: Subject<string> = new Subject();
    const errorMessage$: Subject<string> = new Subject();
    this._claimService.authInvoiceRedirect(
      jobNumber,
      vendorId,
      authorizeUrl$,
      completion$,
      error$,
      errorMessage$
    );

    completion$.subscribe((completed: boolean) => {
      completed ? this.loading = false : this.loading = true;
      if (!this.loading) {
        authorizeUrl$.subscribe((url: string) => {
          this._sendToPortal(url);
        });
      }
    });
  }
  public isAuthorizing(jobNumber: string, jobStatus: string): boolean {
    return this.authorizingJobNumber === jobNumber && this.authorizingJobStatus === jobStatus;
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

  public onSort(sort: SortEventInterface, claimList: Claim[]) {
    if (!this.headers || !this.claimsFound) {
      return;
    }

    this.headers.forEach(header => {
      if (header.appSortable !== sort.column) {
        header.direction = SortDirectionEnums.None;
      }
    });

    this._sortList(sort.column, sort.direction, claimList);
  }

  private _sortList(
    column: string,
    direction: string,
    claimList: Claim[]
  ): void {
    if (direction !== SortDirectionEnums.None && column !== '') {
      claimList = claimList.sort((a: Claim, b: Claim) => {
        const result = this._compareString(`${a[column]}`, `${b[column]}`);
        return direction === SortDirectionEnums.Ascending ? result : -result;
      });
    }
  }

  private _sendToPortal(url: string): void {
    this._windowRefService.window.open(url, '_blank');
  }

  private _getPageSize(claimsAmount: number): number {
    return claimsAmount > 150 ? 20 : 10;
  }

  private _compareString(v1?: string, v2?: string) {
    return (v1 < v2) ? -1 : (v1 > v2) ? 1 : 0;
  }
}
