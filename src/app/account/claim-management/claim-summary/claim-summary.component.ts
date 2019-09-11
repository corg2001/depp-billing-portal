import { Component, OnInit } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { Claim } from '../model/claims.model';
import { ClaimPayloadInterface } from '../interface/claim.payload.interface';
import { ClaimServiceAbstract } from '../service/claim.abstract.service';
import { ClaimFactoryServiceAbstract } from '../service/factory/claim.factory.abstract.service';
import * as moment from 'moment-timezone';
import { ConfigService } from 'src/app/core/config.service';

// TODO: move it into it's own file
enum SessionKeys {
  token = 'token',
  last_login = 'last_login',
  session = 'session'
}

@Component({
  selector: 'app-claim-summary',
  templateUrl: './claim-summary.component.html',
  styleUrls: ['./claim-summary.component.scss']
})
export class ClaimSummaryComponent implements OnInit {
  public claimListSubject$: BehaviorSubject<Claim[]> = new BehaviorSubject([]);
  public claimPaylodSubject$: BehaviorSubject<
    ClaimPayloadInterface[]
  > = new BehaviorSubject([]);
  public completionSubject$: Subject<boolean> = new Subject();
  public searchedClaimSubject$?: BehaviorSubject<Claim[]> = new BehaviorSubject(
    []
  );
  public claims: Claim[] = [];
  public subTitleText1: string = 'My Recent Activity';
  public subTitleText2: string = 'View your claims below';
  public lastLoginDate: string = '';
  public partyName: string;

  constructor(
    private _claimsService: ClaimServiceAbstract,
    private _claimFactoryService: ClaimFactoryServiceAbstract,
    private _configService: ConfigService
  ) {}

  ngOnInit() {
    this.partyName = this._configService.getPartyName();
    this._claimsService.getClaims(
      this.completionSubject$,
      this.claimPaylodSubject$
    );
    this.claimPaylodSubject$.subscribe(
      (claimPlayod: ClaimPayloadInterface[]) => {
        this.claims = this._claimFactoryService.getClaimFromPayload(
          claimPlayod
        );
        this.claimListSubject$.next(this.claims);
      }
    );
    if (
      localStorage.getItem(SessionKeys.last_login) !== undefined &&
      localStorage.getItem(SessionKeys.last_login) !== ''
    ) {
      this.lastLoginDate = `Last Login: ${moment(localStorage.getItem(SessionKeys.last_login))
        .tz('America/Chicago')
        .format('LLLL')} CST`;
    }
  }

  public search(claims: Claim[]): void {
    this.searchedClaimSubject$.next(claims);
  }
}
