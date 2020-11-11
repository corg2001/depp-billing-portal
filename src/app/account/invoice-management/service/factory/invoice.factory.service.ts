import { Injectable } from '@angular/core';
import { InvoicePayloadInterface } from '../../interface/payload/invoice.payload.interface';
import { InvoiceInterface } from '../../interface/invoice.interface';
import { InvoiceFactoryAbstractService } from './abstract/invoice.factory.abstract.service';
import { InvoicPaymentStatusEnum } from '../../model/enums/invoice-payment-status.enum';

@Injectable({
  providedIn: 'root'
})
export class InvoiceFactoryService implements InvoiceFactoryAbstractService {

  constructor() { }

  public getInvoicesFromPayload(payload: InvoicePayloadInterface[]): InvoiceInterface[] {
    const invoicesList: InvoiceInterface[] = [];
    let _invoice: InvoiceInterface;
    payload.forEach((invoice: InvoicePayloadInterface) => {
      _invoice = {
        claimDate: invoice.claim_date,
        claimId: invoice.claim_id,
        customerName: invoice.customer_name,
        invoiceAmount: invoice.invoice_amount,
        invoiceDate: invoice.invoice_date,
        invoiceId: invoice.invoice_id,
        serviceAddress: this.removeEnterKeys(invoice.service_address),
        invoicePaymentStatus: invoice.invoice_payment_status
      };
      invoicesList.push(_invoice);
    });
    return invoicesList.filter((invoices: InvoiceInterface) => invoices.invoicePaymentStatus === InvoicPaymentStatusEnum.unpaid);
  }

  public removeEnterKeys(message: string): string {
    return message.replace(/(\r\n|\n|\r)/gm, '');
  }
}
