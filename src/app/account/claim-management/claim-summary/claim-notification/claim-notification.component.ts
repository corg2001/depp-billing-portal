import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Claim } from '../../model/claims.model';
import { JobStatus } from '../../model/claims.enums';
import { ClaimServiceAbstract } from '../../service/abstract/claim.abstract.service';

@Component({
  selector: 'app-claim-notification',
  templateUrl: './claim-notification.component.html',
  styleUrls: ['./claim-notification.component.scss']
})
export class ClaimNotificationComponent implements OnInit {
  @Input() public claimSubject$: BehaviorSubject<Claim[]> = new BehaviorSubject([]);
  @Input() public searchedClaims$: BehaviorSubject<Claim[]> = new BehaviorSubject([]);
  public wipClaims: number = 0;
  constructor(private _claimService: ClaimServiceAbstract) { }

  ngOnInit() {
    this.getClaims();
  }

  public showNotifcation(): boolean {
    return this.wipClaims > 0 ? true : false;
  }

  public getClaims(): void {
    this.claimSubject$.subscribe((claims: Claim[]) => {
      this.getWipClaims(claims);
    });

    this.searchedClaims$.subscribe((claims: Claim[]) => {
      this.getWipClaims(claims);
    });
  }

  public getWipClaims(claims: Claim[]): void {
    this.wipClaims = 0;
    this._claimService.getClaimInDateRange(claims).forEach((claim: Claim) => {
      if (claim.jobStatus === JobStatus.wip) {
        this.wipClaims++;
      }
    });
  }
}

