import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { PaymentHistoryInterface } from '../../interface/payment-history.interface';
import { HttpParams, HttpErrorResponse } from '@angular/common/http';
import { VendorInvoiceDetailsInterface } from '../../interface/vendor-invoice-details.interface';

@Injectable({
  providedIn: 'root'
})
export abstract class PaymentAbstractService {
  public paymentHistory: PaymentHistoryInterface;

  abstract setInvoicDetails(data: PaymentHistoryInterface): void;
  abstract getPaymentHistory(
    paymentHistory$: BehaviorSubject<PaymentHistoryInterface[]>,
    completion$: Subject<boolean>,
    error$: Subject<boolean>,
    errorMessage$: Subject<any>
  ): void;

  abstract buildPaymentHistoryParams(
    vendorId: string,
    companyInfo: string
  ): HttpParams;

  abstract paymentHistorySuccessHandler(
    paymentHistory$: BehaviorSubject<PaymentHistoryInterface[]>,
    completion$: Subject<boolean>,
    error$: Subject<boolean>,
    data: any
  ): void;

  abstract paymentHistoryErrorHandler(
    error$: Subject<boolean>,
    errorMessage$: Subject<any>,
    completion$: Subject<boolean>,
    response: Observable<HttpErrorResponse>
  ): void;

  abstract search(
    paymentHistory: PaymentHistoryInterface[],
    address?: string,
    customerName?: string,
    referenceId?: string
  ): PaymentHistoryInterface[];
}
