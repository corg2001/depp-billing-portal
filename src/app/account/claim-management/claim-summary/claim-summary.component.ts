import { Component, OnInit } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { Claim } from '../model/claims.model';
import { ClaimPayloadInterface } from '../interface/claim.payload.interface';
import { ClaimServiceAbstract } from '../service/claim.abstract.service';
import { ClaimFactoryServiceAbstract } from '../service/factory/claim.factory.abstract.service';

@Component({
  selector: 'app-claim-summary',
  templateUrl: './claim-summary.component.html',
  styleUrls: ['./claim-summary.component.scss']
})
export class ClaimSummaryComponent implements OnInit {
  public claimListSubject$: BehaviorSubject<Claim[]> = new BehaviorSubject([]);
  public claimPaylodSubject$: BehaviorSubject<ClaimPayloadInterface[]> = new BehaviorSubject([]);
  public completionSubject$: Subject<boolean> = new Subject();
  public searchedClaimSubject$?: BehaviorSubject<Claim[]> = new BehaviorSubject([]);
  public claims: Claim[] = [];


  constructor(private _claimsService: ClaimServiceAbstract, private _claimFactoryService: ClaimFactoryServiceAbstract) {}

  ngOnInit() {
    this._claimsService.getClaims(
      this.completionSubject$,
      this.claimPaylodSubject$
    );
    this.claimPaylodSubject$.subscribe((claimPlayod: ClaimPayloadInterface[]) => {
      this.claims = this._claimFactoryService.getClaimFromPayload(claimPlayod);
    this.claimListSubject$.next(this.claims);
    });
  }

  public search(claims: Claim[]): void {
    this.searchedClaimSubject$.next(claims);
  }
}
