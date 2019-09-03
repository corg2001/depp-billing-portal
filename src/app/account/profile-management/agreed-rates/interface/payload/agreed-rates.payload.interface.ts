
import { TradeAgreementDetailsPayloadInterface } from './trade-agreement-details.payload.interface';
import { RateDetailsInterface } from '../rate-details.interface';

export interface AgreedRatesPayloadInterface {
    readonly rate_details: RateDetailsInterface[];
    readonly trade_agreement_details: TradeAgreementDetailsPayloadInterface[];
}