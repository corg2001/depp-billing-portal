import { Component, Input, OnChanges } from '@angular/core';
import { AgreedRates } from './model/agreed-rates.model';
import { TradeAgreementDetailsInterface } from './interface/trade-agreement-deatils.interface';
import { RateDetailsInterface } from './interface/rate-details.interface';

@Component({
  selector: 'app-agreed-rates',
  templateUrl: './agreed-rates.component.html',
  styleUrls: ['./agreed-rates.component.scss']
})
export class AgreedRatesComponent implements OnChanges {
  @Input() public agreedRates?: AgreedRates;
  @Input() public completion?: boolean;
  @Input() public error?: boolean;
  public rateDetails: RateDetailsInterface[];
  public tradeAgreementDetaills: TradeAgreementDetailsInterface[];
  public isData: boolean;
  public loading: boolean = true;
  public noInfoText: string;
  constructor() {}

  ngOnChanges(): void {
    this.init();
  }

  public init(): void {
    this.noInfoText =
      'Your Agreed Rates is not set up. Please reach out to contractor relations at 1-888-888-8888.';
    if (this.agreedRates) {
      this.agreedRates.rateDetails.length > 0 && this.completion === true
        ? (this.isData = true)
        : (this.isData = false);
      this.rateDetails = this.agreedRates.rateDetails;
      this.tradeAgreementDetaills = this.agreedRates.tradeAgreementDetails;
    }
    this.isLoading();
  }
  public isLoading(): void {
    this.completion === true ? this.loading = false : this.loading = true;
  }
}
