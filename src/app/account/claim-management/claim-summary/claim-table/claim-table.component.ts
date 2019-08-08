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
  public page: number;
  public pageSize: number;
  public collectionSize: number;
  public pageList: number[] = [2, 4, 6, 8];

  constructor(private _claimsService: ClaimService) { }

  ngOnInit() {
 this._claimsService.claims$.subscribe((claims: Claim[]) => {
    this.claims = claims;
  });
  this.page = 1;
  this.pageSize = 4;
  this.collectionSize = this.claims.length;
  }
  public get modifiedClaims(): Claim[] {
    return this.claims.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
}
