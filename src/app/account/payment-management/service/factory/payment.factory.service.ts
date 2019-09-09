import { Injectable } from '@angular/core';
import { PaymentHistoryPayloadInterface } from '../../interface/payload/payment-history.payload.interface';
import { PaymentHistoryInterface } from '../../interface/payment-history.interface';
import { VendorInvoiceDetailsInterface } from '../../interface/vendor-invoice-details.interface';
import { VendorInvoiceDetailsPayloadInterface } from '../../interface/payload/vendor-invoice-details.payload.interface';

@Injectable({
  providedIn: 'root'
})
export class PaymentFactoryService {

  constructor() { }

  public getPaymentHistoryFromPayload(payload: PaymentHistoryPayloadInterface[]): PaymentHistoryInterface[] {
    const paymenHistoryList: PaymentHistoryInterface[] = [];
    const venderInvoiceDetailsList: VendorInvoiceDetailsInterface[] = [];
    let paymentHistory: PaymentHistoryInterface;
    let vendorInvoiceDetails: VendorInvoiceDetailsInterface;
    payload.forEach((paymentHistoryPayload: PaymentHistoryPayloadInterface) => {
      paymentHistory = {
        paymentAmount: paymentHistoryPayload.payment_amount,
        paymentDate: paymentHistoryPayload.payment_date,
        paymentMethod: paymentHistoryPayload.payment_method,
        paymentReferenceNo: paymentHistoryPayload.payment_reference_no,
        vendorInvoiceDetails: venderInvoiceDetailsList
      };
      paymentHistoryPayload.vendor_invoice_details.forEach((venderInvoiceDetailsPayload: VendorInvoiceDetailsPayloadInterface) => {
        vendorInvoiceDetails = {
          claimDate: venderInvoiceDetailsPayload.claim_date,
          claimId: venderInvoiceDetailsPayload.claim_id,
          customerName: venderInvoiceDetailsPayload.customer_name,
          invoiceAmount: venderInvoiceDetailsPayload.invoice_amount,
          invoiceId: venderInvoiceDetailsPayload.invoice_id,
          serviceAddress: venderInvoiceDetailsPayload.service_address
        };
        venderInvoiceDetailsList.push(vendorInvoiceDetails);
      });
      paymenHistoryList.push(paymentHistory);
    });
    return paymenHistoryList;
  }
}
