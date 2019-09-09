import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { InvoiceInterface } from '../../interface/invoice.interface';
import { HttpParams, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export abstract class InvoiceAsbstractService {

  constructor() { }

  abstract getInvoice(
    invoices$: BehaviorSubject<InvoiceInterface[]>,
    completion$: Subject<boolean>,
    error$: Subject<boolean>,
    errorMessage$?: Subject<string>
  ): void;

  abstract getInvoiceParams(vendorId: string, companyInfo: string, date: string): HttpParams;

  abstract getInvoiceSuccessHandler(
    invoices$: BehaviorSubject<InvoiceInterface[]>,
    completion$: Subject<boolean>,
    error$: Subject<boolean>,
    response: any
  ): void;

  abstract getInvoiceErrorHandler(
    completion$: Subject<boolean>,
    error$: Subject<boolean>,
    error: Observable<HttpErrorResponse>,
    errorMessage$?: Subject<any>
  ): void;

  abstract  search(
    invoices: InvoiceInterface[],
    startDate?: string,
    endDate?: string,
    serviceAddress?: string
  ): InvoiceInterface[];
}
