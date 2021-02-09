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
import { PaymentAbstractService } from './abstract/payment.abstract.service';
import * as moment from 'moment-timezone';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class PaymentService implements PaymentAbstractService {
  public paymentHistory: PaymentHistoryInterface;
  public defaultPaymentStartDate: string;
  public defualyPaymentEndDate: string;
  constructor(
    private _http: HttpClient,
    private _configService: ConfigService,
    private _paymentHistoryFactoryService: PaymentFactoryService,
    private _calendar: NgbCalendar,
  ) { }

  public getPaymentHistory(
    paymentHistory$: BehaviorSubject<PaymentHistoryInterface[]>,
    completion$: Subject<boolean>,
    error$: Subject<boolean>,
    errorMessage$: Subject<any>,
    startDate?: string,
    endDate?: string

  ): void {
    const rawFromDate: NgbDate = this._calendar.getPrev(this._calendar.getToday(), 'd', 60);
    const rawEndDate = this._calendar.getToday();
    const formatedStartDate: string = startDate ? startDate : this.getFormattedDate(rawFromDate);
    const formatedEndDate: string = endDate ? endDate : this.getFormattedDate(rawEndDate);
    const params = this.getPaymenHistoryParams(formatedStartDate, formatedEndDate);
    this.defaultPaymentStartDate = formatedStartDate;
    this.defualyPaymentEndDate = formatedEndDate;
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

  public getFormattedDate(date: NgbDate): string {
    return `${date.year}-${date.month}-${date.day}`;
  }

  public getPaymenHistoryParams(startDate: string, endDate: string): HttpParams {
    return new HttpParams().set(HttpParamEnum.starDate, startDate).set(HttpParamEnum.endDate, endDate);
  }

  public paymentHistorySuccessHandler(
    paymentHistory$: BehaviorSubject<PaymentHistoryInterface[]>,
    completion$: Subject<boolean>,
    error$: Subject<boolean>,
    data: any
  ): void {
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

  public setInvoicDetails(paymentHistory: PaymentHistoryInterface): void {
    this.paymentHistory = paymentHistory;
  }

  public search(
    paymentHistory: PaymentHistoryInterface[],
    minDate: string,
    maxDate: string
  ): PaymentHistoryInterface[] {

    return paymentHistory.filter((history: PaymentHistoryInterface) => {

      if (moment.utc(history.paymentDate).isAfter(minDate)
        && moment.utc(history.paymentDate).isBefore(maxDate)) {
        return history;
      }
    });
  }
}
