import { Component, OnInit } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { ClaimService } from '../claim.service';
import { Claim } from '../model/claims.model';

@Component({
  selector: 'app-claim-summary',
  templateUrl: './claim-summary.component.html',
  styleUrls: ['./claim-summary.component.scss']
})
export class ClaimSummaryComponent implements OnInit {
  public claimListSubject$: BehaviorSubject<Claim[]> = new BehaviorSubject([]);
  public completionSubject: Subject<boolean> = new Subject();
  public searchedClaimSubject$?: BehaviorSubject<Claim[]> = new BehaviorSubject([]);
  public claims: Claim[] = [];


  constructor(private _claimsService: ClaimService) {}

  ngOnInit() {
    this._claimsService.getClaims(
      this.completionSubject,
      this.claimListSubject$
    );
  }

  public search(claims: Claim[]): void {
    this.searchedClaimSubject$.next(claims);
  }
}
