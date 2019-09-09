import * as Money from 'js-money';

export interface InvoiceInterface {
  readonly claimDate?: string;
  readonly claimId?: string;
  readonly customerName?: string;
  readonly invoiceAmount?: Money;
  readonly invoiceDate?: string;
  readonly invoiceId?: string;
  readonly serviceAddress?: string;
}
