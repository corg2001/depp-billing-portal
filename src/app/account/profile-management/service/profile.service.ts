import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { ConfigService } from 'src/app/core/config.service';
import { LoggerService } from 'src/app/core/logger.service';
import { ProfileFactoryService } from './factory/profile.factory.service';
import { AchDocuments } from '../ach-documents/model/ach-documents.model';
import { ProfileAbstractService } from './abstract/profile.abstract.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService implements ProfileAbstractService {
  constructor(
    private _httpClient: HttpClient,
    private _configService: ConfigService,
    private _loggerService: LoggerService,
    private _proficeFactoryService: ProfileFactoryService
  ) {}

  public getAchInfo(
    data$: BehaviorSubject<AchDocuments[]>,
    sussesful$: Subject<boolean>
  ): void {
    const uri: string =
      'https://unify-hwa-contractor-api-qa11.engine.host/services/vendor/ach-info';
    const partyId: string = this._configService.getPartyId();
    const companyInfo: string = this._configService.getCompanyInfo();
    const params: HttpParams = this.buildAchInfoParams(partyId, companyInfo);
    this._httpClient
      .get(uri, { params })
      .subscribe(
        (data: any) => this.achInfoSuccessHandler(data$, sussesful$, data),
        (error: any) => this.achInfoErrorHandler(sussesful$, error)
      );
  }

  public buildAchInfoParams(partyId: string, companyInfo: string): HttpParams {
    return new HttpParams()
      .set('vendor_id', partyId)
      .set('company_info', companyInfo);
  }

  public achInfoSuccessHandler(
    data$: BehaviorSubject<AchDocuments[]>,
    sussesful$: Subject<boolean>,
    data: any
  ): void {
    let achDocs: AchDocuments[] = [];
    this._loggerService.action('Successfully obtain ach Information data');
    achDocs = this._proficeFactoryService.getAchInfoFromPayload(data);
    sussesful$.next(true);
    data$.next(achDocs);
  }

  public achInfoErrorHandler(sussesful$: Subject<boolean>, error: any): void {
    this._loggerService.error('Unable to retrieve ach Information data');
    sussesful$.next(false);
  }
}
