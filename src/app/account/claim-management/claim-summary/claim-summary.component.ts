import { Component, OnInit } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { Claim } from '../model/claims.model';
import { ClaimPayloadInterface } from '../interface/claim.payload.interface';
import { ClaimServiceAbstract } from '../service/abstract/claim.abstract.service';
import { ClaimFactoryServiceAbstract } from '../service/factory/claim.factory.abstract.service';
import * as moment from 'moment-timezone';
import { ConfigService } from 'src/app/core/config.service';
import { SessionKeys } from 'src/app/shared/enums/session-keys.emums';
import { Router, RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

@Component({
  selector: 'app-claim-summary',
  templateUrl: './claim-summary.component.html',
  styleUrls: ['./claim-summary.component.scss']
})
export class ClaimSummaryComponent implements OnInit {
  public searchedClaim$?: BehaviorSubject<Claim[]> = new BehaviorSubject(
    []
  );
  public completion$: Subject<boolean> = new Subject();
  public claimList$: BehaviorSubject<Claim[]> = new BehaviorSubject([]);
  public claims: Claim[] = [];
  public subTitleText1: string = 'My Recent Activity';
  public subTitleText2: string = 'View your claims below';
  public lastLoginDate: string;
  public partyName: string;
  public isCompleted: boolean;
  public claimsFound: boolean;
  // tslint:disable-next-line: max-line-length
  public coronoaVirusMsg: string = `Due to government health and safety directives and other events beyond our control related to COVID-19, we are currently prioritizing high-risk, emergency claims to meet our customers’ needs. If you are not able to self-authorize, please email your diagnosis to replacements@hwahomewarranty.com. Please include the name on the account and a contact number.  We will contact you as soon as possible.  Thank you for being a valued partner.​`;
  public loading: boolean = true;

  constructor(
    private _claimsService: ClaimServiceAbstract,
    private _claimFactoryService: ClaimFactoryServiceAbstract,
    private _configService: ConfigService,
    private _router: Router
  ) {
    this._router.events.subscribe((e: RouterEvent) => {
      this._navigationInterceptor(e);
    });
  }

  ngOnInit() {
    const claimPayload$: BehaviorSubject<
      ClaimPayloadInterface[]
    > = new BehaviorSubject([]);
    const error$: Subject<boolean> = new Subject();
    this.partyName = this._configService.getPartyName();
    this._claimsService.getClaims(
      this.completion$,
      error$,
      claimPayload$
    );
    claimPayload$.subscribe(
      (claimPlayod: ClaimPayloadInterface[]) => {
        this.claims = this._claimFactoryService.getClaimFromPayload(
          claimPlayod
        );
        this.claimList$.next(this.claims);
        this.claimsFound = this.claims.length > 0 ? true : false;
      }
    );

    this.completion$.subscribe((completed: boolean) => this.isCompleted = completed);
    localStorage.getItem(SessionKeys.last_login) !== undefined
      && localStorage.getItem(SessionKeys.last_login) !== '' ?
      this.lastLoginDate = `Last Login: ${moment(localStorage.getItem(SessionKeys.last_login))
        .tz('America/Chicago')
        .format('LLLL')} CST` : this.lastLoginDate = '';
  }

  public search(claims: Claim[]): void {
    this.searchedClaim$.next(claims);
  }

  private _navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.loading = true;
    }
    if (event instanceof NavigationEnd) {
      this.loading = false;
    }
    if (event instanceof NavigationCancel) {
      this.loading = false;
    }
    if (event instanceof NavigationError) {
      this.loading = false;
    }
  }
}
