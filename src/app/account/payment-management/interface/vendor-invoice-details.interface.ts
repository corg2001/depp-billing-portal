import * as Money from 'js-money';

export interface VendorInvoiceDetailsInterface {
    readonly claimDate: string;
    readonly claimId: string;
    readonly customerName: string;
    readonly invoiceAmount: Money;
    readonly invoiceId: string;
    readonly serviceAddress?: string;
}