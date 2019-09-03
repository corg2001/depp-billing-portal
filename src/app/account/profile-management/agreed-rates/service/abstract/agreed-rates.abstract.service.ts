import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpParams, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { AgreedRates } from '../../model/agreed-rates.model';

@Injectable({
  providedIn: 'root'
})
export abstract class AgreedRatesAbstractService {

  constructor() { }
  abstract getAgreedRates(
    agreedRatesData$: Subject<AgreedRates>,
    error$: Subject<boolean>,
    completion$: Subject<boolean>
  ): void;
 abstract  getAgreedRatesParams(partyId: string,
    companyInfo: string
  ): HttpParams;

  abstract getAgreedRatesSuccessHandler(
    agreedRatesData$: Subject<AgreedRates>,
    error$: Subject<boolean>,
    completion$: Subject<boolean>,
    response: Observable<HttpResponse<any>>
  ): void;

  abstract getAgreedRatesFailureHandler(
    completion$: Subject<boolean>,
    error$: Subject<boolean>,
    errorResponse: Observable<HttpErrorResponse>
  ): void;
}
