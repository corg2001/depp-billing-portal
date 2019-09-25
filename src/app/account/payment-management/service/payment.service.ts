import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpErrorResponse
} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { ConfigService } from 'src/app/core/config.service';
import { HttpParamEnum } from 'src/app/shared/enums/http-params.enums';
import { PaymentFactoryService } from './factory/payment.factory.service';
import { PaymentHistoryInterface } from '../interface/payment-history.interface';
import { VendorInvoiceDetailsInterface } from '../interface/vendor-invoice-details.interface';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  constructor(
    private _http: HttpClient,
    private _configService: ConfigService,
    private _paymentHistoryFactoryService: PaymentFactoryService
  ) {}

  public getPaymentHistory(
    paymentHistory$: BehaviorSubject<PaymentHistoryInterface[]>,
    completion$: Subject<boolean>,
    error$: Subject<boolean>,
    errorMessage$: Subject<any>
  ): void {
    // const vendorId: string = this._configService.getPartyId();
    const vendorId =  this._configService.getVendorId();
    const companyInfo: string = this._configService.getCompanyInfo();
    const params = this.buildPaymentHistoryParams(vendorId, companyInfo);
    this._http
      .get(environment.payementHistoryUrl, { params })
      .subscribe((response: any) => {
        this.paymentHistorySuccessHandler(
          paymentHistory$,
          completion$,
          error$,
          response
        );
      }, (error: any) => this.paymentHistoryErrorHandler(error$, errorMessage$, completion$, error));
  }

  public buildPaymentHistoryParams(
    vendorId: string,
    companyInfo: string
  ): HttpParams {
    return new HttpParams()
      .set(HttpParamEnum.vendorId, vendorId)
      .set(HttpParamEnum.companyInfo, companyInfo);
  }

  public paymentHistorySuccessHandler(
    paymentHistory$: BehaviorSubject<PaymentHistoryInterface[]>,
    completion$: Subject<boolean>,
    error$: Subject<boolean>,
    data: any
  ) {
    completion$.next(true);
    error$.next(false);
    paymentHistory$.next(
      this._paymentHistoryFactoryService.getPaymentHistoryFromPayload(data)
    );
  }

  public paymentHistoryErrorHandler(
    error$: Subject<boolean>,
    errorMessage$: Subject<any>,
    completion$: Subject<boolean>,
    response: Observable<HttpErrorResponse>
  ): void {
    completion$.next(true);
    error$.next(true);
    errorMessage$.next(response);
  }

  public search(
    paymentHistory: PaymentHistoryInterface[],
    address?: string,
    customerName?: string,
    referenceId?: string
  ): PaymentHistoryInterface[] {
    return paymentHistory.filter((history: PaymentHistoryInterface) => {
      history.vendorInvoiceDetails.filter(
        (vendorInvoiceDetails: VendorInvoiceDetailsInterface) => {
          const addressInput = address.toLowerCase();
          const customerNameInput = customerName.toLowerCase();
          const referenceIdInput = referenceId.toLowerCase();
         return address
            ? vendorInvoiceDetails.serviceAddress.includes(addressInput)
            : customerName
            ? vendorInvoiceDetails.customerName.includes(customerNameInput)
            : referenceId
            ? vendorInvoiceDetails.invoiceId.includes(referenceIdInput) : vendorInvoiceDetails;
        }
      );
    });
  }
}
