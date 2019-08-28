import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { ConfigService } from 'src/app/core/config.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private _httpClient: HttpClient, private _configService: ConfigService) { }

  public getAchInfo(data$: Subject<any>, sussesful$: Subject<boolean>): void {
    const uri: string = 'https://unify-hwa-contractor-api-qa11.engine.host/services/vendor/ach-info';
    const partyId: string = this._configService.getPartyId();
    const companyInfo: string = this._configService.getCompanyInfo();
    const params: HttpParams = this.buildAchInfoParams(partyId, companyInfo);
    this._httpClient.get(uri, { params }).subscribe((data: Observable<HttpResponse<any>>) =>
      this._achInfoSuccessHandler(data$, sussesful$, data)
    , (error: Observable<HttpErrorResponse>) => this._achInfoErrorHandler(data$, sussesful$, error));
  }

  public buildAchInfoParams(partyId: string, companyInfo: string): HttpParams {
    return new HttpParams().set('vendor_id', partyId).set('company_info', companyInfo);
  }

  private _achInfoSuccessHandler(data$: Subject<any>, sussesful$: Subject<boolean>, data: Observable<HttpResponse<any>>): void {
    console.log('this is the data from the achInfo call');
    console.log(data);
    sussesful$.next(true);
    data$.next(data);
  }

  private _achInfoErrorHandler(data$: Subject<any>, sussesful$: Subject<boolean>, error: Observable<HttpErrorResponse>): void {
    console.log('ach info call failed');
    console.log(error);
    sussesful$.next(false);
    data$.next(error);

  }
}
