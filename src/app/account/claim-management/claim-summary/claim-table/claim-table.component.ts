import { Component, OnInit } from '@angular/core';
import { ClaimService } from '../../claim.service';
import { Claim } from '../../model/claims.model';

@Component({
  selector: 'app-claim-table',
  templateUrl: './claim-table.component.html',
  styleUrls: ['./claim-table.component.scss']
})
export class ClaimTableComponent implements OnInit {
  public claims: Claim[];

  constructor(private _claimsService: ClaimService) { }

  ngOnInit() {
 this._claimsService.claims$.subscribe((claims: Claim[]) => {
    this.claims = claims;
  });
  }

}
