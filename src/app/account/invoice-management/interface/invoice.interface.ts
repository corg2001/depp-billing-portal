import * as Money from 'js-money';
import { InvoicPaymentStatusEnum } from '../model/enums/invoice-payment-status.enum';

export interface InvoiceInterface {
  readonly claimDate?: string;
  readonly claimId?: string;
  readonly customerName?: string;
  readonly invoiceAmount?: Money;
  readonly invoiceDate?: string;
  readonly invoiceId?: string;
  readonly serviceAddress?: string;
  readonly invoicePaymentStatus?: InvoicPaymentStatusEnum;
}
