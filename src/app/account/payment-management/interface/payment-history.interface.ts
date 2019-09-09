import * as Money from 'js-money';
import { VendorInvoiceDetailsInterface } from './vendor-invoice-details.interface';

export interface PaymentHistoryInterface {
    readonly paymentAmount: Money;
    readonly paymentDate: string;
    readonly paymentMethod: string;
    readonly paymentReferenceNo?: any;
    readonly vendorInvoiceDetails: VendorInvoiceDetailsInterface[];
}