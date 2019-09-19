import { Injectable } from '@angular/core';
import { HttpParams, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpParamEnum } from 'src/app/shared/enums/http-params.enums';
import { ConfigService } from 'src/app/core/config.service';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Subject } from 'rxjs';
import { LoggerService } from 'src/app/core/logger.service';
import { CalendarAbstractService } from './abstract/calendar.abstract.service';

@Injectable({
  providedIn: 'root'
})
export class CalendarService implements CalendarAbstractService{

  constructor(private _http: HttpClient, private _config: ConfigService, private _logger: LoggerService ) { }

  public getCalendarInfo(calendar$: BehaviorSubject<any>, completion$: Subject<boolean>,
    error$: Subject<boolean>, startDate: string, endDate: string ): void {
    const vendorId: string = this._config.getVendorId();
    const companyInfo: string = this._config.getCompanyInfo();
    const params: HttpParams = this.buildCalenderParams(vendorId, companyInfo, startDate, endDate);
    this._http.get(`${environment.calenderUrl}`, { params: params})
    .subscribe((response: any) =>{
      this.calendarSuccessHandler(calendar$, completion$, error$, response);
    },
     (error: HttpErrorResponse) => this.calendarErrorHandler(error$, completion$, error));
  }

  public buildCalenderParams(venderId: string, companyInfo: string, startDate: string, endDate: string): HttpParams {
    return new HttpParams()
    .set(HttpParamEnum.vendorId, venderId)
    .set(HttpParamEnum.companyInfo, companyInfo)
    .set(HttpParamEnum.transactionStartDate, startDate)
    .set(HttpParamEnum.transactionEndDate, endDate);
  }

  public calendarSuccessHandler(calendar$: BehaviorSubject<any>,
     completion$: Subject<boolean>, error$: Subject<boolean>, response: any): void {
       this._logger.action('successfuly obtained calendar info');
       completion$.next(true);
       error$.next(false);
       calendar$.next(response);
  }

  public calendarErrorHandler(error$: Subject<boolean>, completion$: Subject<boolean>, error: HttpErrorResponse): void {
    this._logger.error('unabel to obtain Calendar info');
    error$.next(true);
    completion$.next(true);
  }
}
