import { Component, OnInit } from '@angular/core';
import { ClaimService } from '../../claim.service';
import { Claim } from '../../model/claims.model';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-claim-table',
  templateUrl: './claim-table.component.html',
  styleUrls: ['./claim-table.component.scss']
})
export class ClaimTableComponent implements OnInit {
  public claims: Claim[] = [];
  public page: number;
  public pageSize: number;
  public collectionSize: number = 0;
  public pageList: number[] = [2, 4, 6, 8];

  public claimListSubject: Subject<any> = new Subject();
  public completionSubject: Subject<boolean> = new Subject();
  public loading: boolean = true;
  public authorizeInvoiceLinkText = 'authorize / invoice';

  constructor(private _claimsService: ClaimService) { }

  ngOnInit() {
    this.claimListSubject.subscribe((claimData: Claim[]) => {
      this.claims = claimData.slice(0, 100); // TODO: remove the slice and fix the pagination bar
      this.collectionSize = this.claims.length;
      this.loading = false;
    });
    this.loading = true;
    this._claimsService.getClaims(this.completionSubject, this.claimListSubject);
    this.page = 1;
    this.pageSize = 15;
    this.collectionSize = 10;
  }

  public modifiedClaims(): Claim[] {
    return this.claims.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  public authorizeInvoice(): void {
    console.log('authorize / invoice link clicked');
  }
}
