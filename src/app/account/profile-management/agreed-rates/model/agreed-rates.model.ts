import { AgreedRatesInterface } from '../interface/agreed-rates.interface';
import { RateDetailsInterface } from '../interface/rate-details.interface';
import { TradeAgreementDetailsInterface } from '../interface/trade-agreement-deatils.interface';


export class AgreedRates implements AgreedRatesInterface {
  private _rateDetails: RateDetailsInterface[];
  private _tradeAgreementDetails: TradeAgreementDetailsInterface[];
  constructor(
    rateDetails?: RateDetailsInterface[],
    tradeAgreementDetails?: TradeAgreementDetailsInterface[]
  ) {
    this._rateDetails = rateDetails;
    this._tradeAgreementDetails = tradeAgreementDetails;
  }
  get rateDetails(): RateDetailsInterface[] {
    return this._rateDetails;
  }

  get tradeAgreementDetails(): TradeAgreementDetailsInterface[] {
    return this._tradeAgreementDetails;
  }

  set rateDetails(rateDetails: RateDetailsInterface[]) {
    this._rateDetails = rateDetails;
  }

  set tradeAgreementDetails(tradeAgreementDetails: TradeAgreementDetailsInterface[]) {
    this._tradeAgreementDetails = tradeAgreementDetails;
  }

}
