import { Component, OnInit, Input } from '@angular/core';
import { ClaimService } from '../../service/claim.service';
import { Claim } from '../../model/claims.model';
import { Subject, BehaviorSubject } from 'rxjs';
import { JobStatus, LinkText } from '../../model/claims.enums';
import { WindowRefAbstract } from 'src/app/core/window-ref.abstract.service';
import { environment } from 'src/environments/environment';

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
  public authorizeUrl$: BehaviorSubject<string> = new BehaviorSubject(null);

  constructor(
    private _claimService: ClaimService,
    private _windowRefService: WindowRefAbstract
  ) {}

  ngOnInit() {
    this.noInfoText = `Please contact Contractor Relations at ${environment.core.customerServiceNumber} for assistance.`;
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
    const authPortal = this._windowRefService.window.open('', '_blank');
    authPortal.document.write('Loading Page Auth portal ......');

    this.loading = true;
    const completion$: Subject<boolean> = new Subject<boolean>();
    const error$: Subject<boolean> = new Subject();
    const errorMessage$: Subject<string> = new Subject();
    this._claimService.authInvoiceRedirect(
      jobNumber,
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

  private _sendToPortal(authPortal: any, url: string): void {
    authPortal.location.href = url;

  }


  private _getPageSize(claimsAmount: number): number {
    return claimsAmount > 150 ? 20 : 10;
  }
}
