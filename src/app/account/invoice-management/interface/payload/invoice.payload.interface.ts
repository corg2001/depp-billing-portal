import * as Money from 'js-money';
import { InvoicPaymentStatusEnum } from '../../model/enums/invoice-payment-status.enum';

export interface InvoicePayloadInterface {
    readonly claim_date?: string;
    readonly claim_id?: string;
    readonly customer_name?: string;
    readonly invoice_amount?: Money;
    readonly invoice_date?: string;
    readonly invoice_id?: string;
    readonly service_address?: string;
    readonly invoice_payment_status?: InvoicPaymentStatusEnum;
}
