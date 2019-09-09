import * as Money from 'js-money';
import { VendorInvoiceDetailsPayloadInterface } from './vendor-invoice-details.payload.interface';

export interface PaymentHistoryPayloadInterface {
    readonly payment_amount: Money;
    readonly payment_date: string;
    readonly payment_method: string;
    readonly payment_reference_no?: any;
    readonly vendor_invoice_details: VendorInvoiceDetailsPayloadInterface[];
}