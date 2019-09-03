import { Component, OnInit, Input } from '@angular/core';
import { ClaimService } from '../../service/claim.service';
import { Claim } from '../../model/claims.model';
import { Subject, BehaviorSubject } from 'rxjs';
import { JobStatus, LinkText } from '../../model/claims.enums';
import { WindowRefAbstract } from 'src/app/core/window-ref.abstract.service';

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

  constructor(
    private _claimService: ClaimService,
    private _windowRefService: WindowRefAbstract
  ) {}

  ngOnInit() {
    this.noInfoText = 'Please contact Contractor Relations at 1-888-888-8888 for assistance.';
    this.claimSubject$.subscribe((claimData: Claim[]) => {
      this.claims = claimData;
      this.collectionSize = this.claims.length;
      this.loading = false;
      this.pageSize = this._getPageSize(this.collectionSize);
      this.claims.length > 0
        ? (this.claimsFound = true)
        : (this.claimsFound = false);
    });

    this.searchedClaimSubject$.subscribe((claimData: Claim[]) => {
      this.claims = claimData;
      this.collectionSize = this.claims.length;
      this.claims.length > 0
        ? (this.claimsFound = true)
        : (this.claimsFound = false);
      this.pageSize = this._getPageSize(this.collectionSize);
    });
    this.loading = true;
    this.page = 1;
    this.pageSize = this._getPageSize(this.collectionSize);
  }

  public modifiedClaims(): Claim[] {
    return this.claims.slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize
    );
  }

  public authorizeInvoice(jobNumber: string): void {
    this.loading = true;
    const dataSubject$: Subject<any> = new Subject<any>();
    const completedSubject$: Subject<boolean> = new Subject<boolean>();
    this._claimService.authInvoiceRedirect(
      jobNumber,
      dataSubject$,
      completedSubject$
    );
    completedSubject$.subscribe((success: boolean) => {
      success
        ? (this._authorizeInvoicSuccessHandler(dataSubject$), this.loading = false)
        : (this._authorizeInvoicErrorHandler(dataSubject$), this.loading = false);
    });
    console.log('authorize / invoice link clicked');
  }

  public authorizeLinkText(jobStatus: JobStatus): string {
    // tslint:disable-next-line: max-line-length
    return jobStatus === JobStatus.authorized
      ? LinkText.complete
      : jobStatus === JobStatus.wip
      ? LinkText.authorize
      : jobStatus === JobStatus.complete
      ? LinkText.invoice
      : '';
  }

  private _authorizeInvoicSuccessHandler(dataSubject$: Subject<any>): void {
    dataSubject$.subscribe((data: any) => {
      this._windowRefService.window.open(data.url, '_blank');
    });
  }

  private _authorizeInvoicErrorHandler(dataSubject: Subject<any>): void {
    dataSubject.subscribe((error: any) => {
      // implement a toaster service to show the error
      console.log(`ERROR: ${error.error.message}`);
      console.log(error);
    });
  }

  private _getPageSize(claimsAmount: number): number {
    return claimsAmount > 150 ? 20 : 10;
  }
}
