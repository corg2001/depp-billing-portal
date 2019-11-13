import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Invoice } from '../model/invoice.model';

import { Observable, Subject } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
  HttpResponse
} from '@angular/common/http';
import * as moment from 'moment';
import { ConfigService } from '../../../core/config.service';
import { LoggerService } from '../../../core/logger.service';
import { HttpParamEnum } from 'src/app/shared/enums/http-params.enums';
import { environment } from 'src/environments/environment';
import { InvoiceFactoryService } from './factory/invoice.factory.service';
import { InvoiceInterface } from '../interface/invoice.interface';
import { InvoiceAsbstractService } from './abstract/invoice.asbstract.service';
import * as dateformat from 'dateformat';
import { CalendarEnums } from 'src/app/shared/enums/calendar.enums';
import { CompanyInfoPayloadInterface } from 'src/app/core/interface/payload/company-info.payload.interface';
import { BrandsPayloadInterface } from 'src/app/core/interface/payload/brands.payload.interface';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService implements InvoiceAsbstractService {
  private _invoice: Invoice[] = [];
  public invoice$: BehaviorSubject<Invoice[]>;
  constructor(
    private _configService: ConfigService,
    private loggerService: LoggerService,
    private _http: HttpClient,
    private _invoiceFactoryService: InvoiceFactoryService
  ) {
    this.invoice$ = new BehaviorSubject(this._invoice);
  }

  public getInvoice(
    invoices$: BehaviorSubject<InvoiceInterface[]>,
    completion$: Subject<boolean>,
    error$: Subject<boolean>,
    errorMessage$?: Subject<string>
  ): void {
    // get invoice starting from a year ago
    const date: string = dateformat(moment().subtract(1, 'y'), HttpParamEnum.yearMonthDayFormat);
    const vendorId: string = this._configService.getVendorId();
    const companyInfo: string = this._configService.getCompanyInfo();
    const params: HttpParams = this.getInvoiceParams(
      vendorId,
      companyInfo,
      date
    );
    this._http
      .get(environment.invoicesUrl, { params })
      .subscribe(
        (response: any) =>
          this.getInvoiceSuccessHandler(
            invoices$,
            completion$,
            error$,
            response
          ),
        (error: Observable<HttpErrorResponse>) =>
          this.getInvoiceErrorHandler(completion$, error$, error, errorMessage$)
      );
  }

  public getInvoiceParams(
    vendorId: string,
    companyInfo: string,
    date: string
  ): HttpParams {
  
    return new HttpParams()
      .set(HttpParamEnum.vendorId, vendorId)
      .set(HttpParamEnum.starDate, date)
      .set(HttpParamEnum.companyInfo, companyInfo);
  }

  public getInvoiceSuccessHandler(
    invoices$: BehaviorSubject<InvoiceInterface[]>,
    completion$: Subject<boolean>,
    error$: Subject<boolean>,
    response: any
  ): void {
    this.loggerService.action('Successfully obtain invoice data');
    completion$.next(true);
    error$.next(false);
    invoices$.next(
      this._invoiceFactoryService.getInvoicesFromPayload(response)
    );
  }
  public getInvoiceErrorHandler(
    completion$: Subject<boolean>,
    error$: Subject<boolean>,
    error: Observable<HttpErrorResponse>,
    errorMessage$?: Subject<any>
  ): void {
    this.loggerService.error('Unable to retrieve invoice data');
    completion$.next(true);
    error$.next(true);
    errorMessage$.next(error);
  }

  public search(
    invoices: InvoiceInterface[],
    startDate?: string,
    endDate?: string,
    serviceAddress?: string
  ): InvoiceInterface[] {
    return invoices.filter((invoice: InvoiceInterface) => {
      const _startDate: string = this._formatDateMoment(startDate);
      const _endDate: string = this._formatDateMoment(endDate);
      const _invoiceDate: string = this._formatDateMoment(invoice.invoiceDate);
      const _serviceAddress = serviceAddress.toLowerCase();
      return startDate && endDate && serviceAddress
        ? _startDate  <= _invoiceDate && _endDate >= _invoiceDate && invoice.serviceAddress.toLowerCase().includes(_serviceAddress)
        : startDate && endDate
        ? (_startDate <= _invoiceDate &&  _endDate >= _invoiceDate) || _startDate === _invoiceDate && _endDate === _invoiceDate
        : startDate && _serviceAddress
        ?  _startDate <= _invoiceDate  && invoice.serviceAddress.toLowerCase().includes(_serviceAddress)
        : endDate && _serviceAddress
        ?  _endDate >= _invoiceDate  && invoice.serviceAddress.toLowerCase().includes(_serviceAddress)
        : startDate
        ?  _startDate <= _invoiceDate
        : endDate
        ? _endDate >= _invoiceDate
        : serviceAddress
        ? invoice.serviceAddress.toLowerCase().includes(_serviceAddress)
        : invoice;
    });
  }

  private _formatDateMoment(date: string): string {
    return moment(date).format(CalendarEnums.monthDayYearCaps);
  }
}
