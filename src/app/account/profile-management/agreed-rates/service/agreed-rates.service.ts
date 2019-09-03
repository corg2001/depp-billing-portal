import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Observable, Subject } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
  HttpResponse
} from '@angular/common/http';
import { AgreedRates } from '../model/agreed-rates.model';
import { ConfigService } from 'src/app/core/config.service';
import { LoggerService } from 'src/app/core/logger.service';
import { AgreedRatesAbstractService } from './abstract/agreed-rates.abstract.service';
import { AgreedRatesFactoryAbstractService } from './factory/abstract/agreed-rates.factory.abstract.service';

@Injectable({
  providedIn: 'root'
})
export class AgreedRatesService implements AgreedRatesAbstractService {
  private _agreedRates: AgreedRates[] = [];
  public agreedRates$: BehaviorSubject<AgreedRates[]>;
  constructor(
    private _configService: ConfigService,
    private _httpClient: HttpClient,
    private _loggerService: LoggerService,
    private _agreedRatesFactoryService: AgreedRatesFactoryAbstractService
  ) {}

  public getAgreedRates(
    agreedRatesData$: Subject<AgreedRates>,
    error$: Subject<boolean>,
    completion$: Subject<boolean>
  ): void {
    const uri: string =
      'https://unify-hwa-contractor-api-qa11.engine.host/services/vendor/agreed-rate';
    const companyInfo: any  = this._configService.getCompanyInfo();
    const partyId: string = this._configService.getPartyId();
    const params: HttpParams = this.getAgreedRatesParams(partyId, companyInfo);

    this._httpClient.get(uri, { params: params }).subscribe((response: any) => {
      this.getAgreedRatesSuccessHandler(agreedRatesData$, error$, completion$, response);
    },
    (error: any) => {
      this.getAgreedRatesFailureHandler(completion$, error$, error);
    });
  }

  public getAgreedRatesParams(
    partyId: string,
    companyInfo: any
  ): HttpParams {
    return  new HttpParams().set('vendor_id', partyId).set('company_info', companyInfo)
  }

  public getAgreedRatesSuccessHandler(
    agreedRatesData$: Subject<AgreedRates>,
    error$: Subject<boolean>,
    completion$: Subject<boolean>,
    response: any
  ): void {
    let  agreedRates: AgreedRates;
    completion$.next(true);
    error$.next(false);
    this._loggerService.action('Successfully obtain agreedRates data');
    agreedRates = this._agreedRatesFactoryService.getAgreedRatesFromPayload(response);
    agreedRatesData$.next(agreedRates);
  }
  public getAgreedRatesFailureHandler(
    completion$: Subject<boolean>,
    error$: Subject<boolean>,
    errorResponse: Observable<HttpErrorResponse>
  ): void {
    completion$.next(true);
    error$.next(true);
    this._loggerService.error('Unable to retrieve agreedRates data');
    console.log(errorResponse);
  }
}

export interface CompanyInfo {
  readonly company_id: string;
      readonly brands: string[];

}