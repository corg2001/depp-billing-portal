import * as Money from 'js-money';

export interface VendorInvoiceDetailsPayloadInterface {
    readonly claim_date: string;
    readonly claim_id: string;
    readonly customer_name: string;
    readonly invoice_amount: Money;
    readonly invoice_id: string;
    readonly service_address?: string;
}