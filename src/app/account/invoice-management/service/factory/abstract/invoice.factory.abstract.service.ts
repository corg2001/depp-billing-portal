import { Injectable } from '@angular/core';
import { InvoicePayloadInterface } from '../../../interface/payload/invoice.payload.interface';
import { InvoiceInterface } from '../../../interface/invoice.interface';

@Injectable({
  providedIn: 'root'
})
export abstract class InvoiceFactoryAbstractService {

  constructor() { }

  abstract getInvoicesFromPayload(payload: InvoicePayloadInterface[]): InvoiceInterface[];
}
