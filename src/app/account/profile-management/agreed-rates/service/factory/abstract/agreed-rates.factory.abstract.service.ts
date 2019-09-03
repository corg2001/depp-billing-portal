import { Injectable } from '@angular/core';
import { AgreedRatesPayloadInterface } from '../../../interface/payload/agreed-rates.payload.interface';
import { AgreedRates } from '../../../model/agreed-rates.model';

@Injectable({
  providedIn: 'root'
})
export abstract class AgreedRatesFactoryAbstractService {

  constructor() { }

  abstract  getAgreedRatesFromPayload(agreedRates: AgreedRatesPayloadInterface): AgreedRates;
}
