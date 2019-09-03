import { RateDetailsInterface } from './rate-details.interface';
import { TradeAgreementDetailsInterface } from './trade-agreement-deatils.interface';

export interface AgreedRatesInterface {
    readonly rateDetails: RateDetailsInterface[];
    readonly tradeAgreementDetails: TradeAgreementDetailsInterface[];
  }
