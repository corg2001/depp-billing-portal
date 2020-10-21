import * as Money from 'js-money';

export interface VendorInvoiceDetailsInterface {
  readonly claimId: string;
  readonly claimDate: string;
  readonly jobId: string;
  readonly jobDate: string;
  readonly customerName: string;
  readonly invoiceAmount: Money;
  readonly invoiceId: string;
  readonly serviceAddress?: string;

}
