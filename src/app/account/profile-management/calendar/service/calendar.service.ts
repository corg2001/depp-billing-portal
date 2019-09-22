import { Injectable } from '@angular/core';
import {
  HttpParams,
  HttpClient,
  HttpErrorResponse
} from '@angular/common/http';
import { HttpParamEnum } from 'src/app/shared/enums/http-params.enums';
import { ConfigService } from 'src/app/core/config.service';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Subject } from 'rxjs';
import { LoggerService } from 'src/app/core/logger.service';
import { CalendarAbstractService } from './abstract/calendar.abstract.service';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class CalendarService implements CalendarAbstractService {
  constructor(
    private _http: HttpClient,
    private _config: ConfigService,
    private _logger: LoggerService
  ) {}

  public getCalendarInfo(
    calendar$: BehaviorSubject<any>,
    completion$: Subject<boolean>,
    error$: Subject<boolean>,
    startDate: string,
    endDate: string
  ): void {
    const vendorId: string = this._config.getVendorId();
    const companyInfo: string = this._config.getCompanyInfo();
    const params: HttpParams = this.buildCalenderParams(
      vendorId,
      companyInfo,
      startDate,
      endDate
    );
    this._http.get(`${environment.calenderUrl}`, { params: params }).subscribe(
      (response: any) => {
        this.calendarSuccessHandler(calendar$, completion$, error$, response);
      },
      (error: HttpErrorResponse) =>
        this.calendarErrorHandler(error$, completion$, error)
    );
  }

  public buildCalenderParams(
    venderId: string,
    companyInfo: string,
    startDate: string,
    endDate: string
  ): HttpParams {
    return new HttpParams()
      .set(HttpParamEnum.vendorId, venderId)
      .set(HttpParamEnum.companyInfo, companyInfo)
      .set(HttpParamEnum.transactionStartDate, startDate)
      .set(HttpParamEnum.transactionEndDate, endDate);
  }

  public calendarSuccessHandler(
    calendar$: BehaviorSubject<any>,
    completion$: Subject<boolean>,
    error$: Subject<boolean>,
    response: any
  ): void {
    this._logger.action('successfuly obtained calendar info');
    completion$.next(true);
    error$.next(false);
    calendar$.next(response);
  }

  public calendarErrorHandler(
    error$: Subject<boolean>,
    completion$: Subject<boolean>,
    error: HttpErrorResponse
  ): void {
    this._logger.error('unabel to obtain Calendar info');
    error$.next(true);
    completion$.next(true);
  }

  public tradeSearch(tradeDetails: any[], trade: string): any[] {
    const trades = [];
    tradeDetails.forEach((_tradeDetail: any) => {
      trades.push(
        _.find(_tradeDetail, (tradeDetail: any) => tradeDetail.trade === trade)
      );
    });
    return trades;
  }

  public stateSearch(tradeDetails: any[], state: string): any[] {
    const states = [];
    tradeDetails.forEach((_tradeDetail: any) => {
      _tradeDetail.forEach((_detail: any) => {
        _detail.service_call_details.forEach((callDetail: any) => {
          if (callDetail.state_code === state) {
            states.push(_detail);
          }
        });
      });
    });
    return states;
  }

  public search(tradeDetails: any[], state: string, trade: string): any[] {

    const states: any[] = [];
    const trades: any[] = [];
    tradeDetails.forEach((_tradeDetail: any) => {
      _tradeDetail.forEach((_detail: any) => {
        _detail.service_call_details.forEach((callDetail: any) => {
          if (callDetail.state_code === state) {
            states.push(_detail);
          }
        });
      });
    });
    console.log(states);
    states.forEach((_tradeDetail: any) => {
      const _all = [];
      if (_tradeDetail.trade === trade) {
        trades.push(_tradeDetail);
      }
    });
    return trades;
  }
}
