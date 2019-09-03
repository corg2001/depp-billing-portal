import { Injectable } from '@angular/core';
import { AgreedRates } from '../../model/agreed-rates.model';
import { AgreedRatesPayloadInterface } from '../../interface/payload/agreed-rates.payload.interface';
import { TradeAgreementDetails } from '../../model/trad-agreement-deatils.model';
import { TradeAgreementDetailsPayloadInterface } from '../../interface/payload/trade-agreement-details.payload.interface';
import { AgreedRatesFactoryAbstractService } from './abstract/agreed-rates.factory.abstract.service';
import { RateDetailsInterface } from '../../interface/rate-details.interface';
import { RateDetails } from '../../model/rate-details.model';

@Injectable({
  providedIn: 'root'
})
export class AgreedRatestFactoryService implements AgreedRatesFactoryAbstractService {
  constructor() {}

  public getAgreedRatesFromPayload(agreedRates: AgreedRatesPayloadInterface): AgreedRates {
    const rateDetailsList: RateDetailsInterface[] = [];
    const tradeAgreementDetailsList: TradeAgreementDetails[] = [];
    
    agreedRates.rate_details.forEach((rateDetailsPayload: RateDetailsInterface) => {
      const rateDetails: RateDetails = new RateDetails(rateDetailsPayload.description, rateDetailsPayload.rate, rateDetailsPayload.unit);
      rateDetailsList.push(rateDetails);
    });

    agreedRates.trade_agreement_details.forEach(
      (tradeAgreementDetailsPayload: TradeAgreementDetailsPayloadInterface) => {
        const tradeAgreement: TradeAgreementDetails = new TradeAgreementDetails(
          tradeAgreementDetailsPayload.rate,
          tradeAgreementDetailsPayload.unit,
          tradeAgreementDetailsPayload.item_description,
          tradeAgreementDetailsPayload.trade
        );
        tradeAgreementDetailsList.push(tradeAgreement);
      }
    );

    return new AgreedRates(rateDetailsList, tradeAgreementDetailsList);
  }
}
