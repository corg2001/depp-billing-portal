import { Component, OnInit, Input } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { AgreedRates } from '../model/agreed-rates.model';
import { TradeAgreementDetailsInterface } from '../interface/trade-agreement-deatils.interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-agreed-rates-table',
  templateUrl: './agreed-rates-table.component.html',
  styleUrls: ['./agreed-rates-table.component.scss']
})

export class AgreedRatesTableComponent implements OnInit {
  @Input() public tradeAgreementDetails: TradeAgreementDetailsInterface[];
  @Input() public completion$?: Subject<boolean> = new Subject();
  public page: number;
  public pageSize: number;
  public collectionSize: number = 0;
  public pageList: number[] = [2, 4, 6, 8];
  public isData?: boolean = false;
  public noInfoText: string;

  constructor() { }

  ngOnInit() {
    this.noInfoText =
      `Your Agreed Rates Trade Agreement Details is not set up. Please reach out to contractor relations at ${environment.core.customerServiceNumber}.`;
    this.page = 1;
    this.pageSize = 15;
    this.collectionSize = this.tradeAgreementDetails.length;
    this.tradeAgreementDetails.length > 0 ? this.isData = true : this.isData = false;
  }

  public modifiedTradeAgreementDetails(): TradeAgreementDetailsInterface[] {
    return this.tradeAgreementDetails.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
}
