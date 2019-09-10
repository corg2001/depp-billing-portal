import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams,
} from '@angular/common/http';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { ConfigService } from 'src/app/core/config.service';
import { LoggerService } from 'src/app/core/logger.service';
import { ProfileFactoryService } from './factory/profile.factory.service';
import { AchDocuments } from '../ach-documents/model/ach-documents.model';
import { ProfileAbstractService } from './abstract/profile.abstract.service';
import { ProfileFactoryAbstractService } from './factory/abstract/profile.factory.abstract.service';
import { environment } from 'src/environments/environment';
import { HttpParamEnum } from 'src/app/shared/enums/http-params.enums';

@Injectable({
  providedIn: 'root'
})
export class ProfileService implements ProfileAbstractService {
  constructor(
    private _httpClient: HttpClient,
    private _configService: ConfigService,
    private _loggerService: LoggerService,
    private _proficeFactoryService: ProfileFactoryAbstractService
  ) {}

  public getAchDocs(
    achInfoData$: BehaviorSubject<AchDocuments[]>,
    error$: Subject<boolean>,
    completion$: Subject<boolean>
  ): void {
    const partyId: string = this._configService.getVendorId();
    const companyInfo: string = this._configService.getCompanyInfo();
    const params: HttpParams = this.buildAchDocsParams(partyId, companyInfo);
    this._httpClient
      .get(environment.achDocsUrl, { params })
      .subscribe(
        (data: any) => this.achDocsSuccessHandler(achInfoData$, error$, completion$, data),
        (error: any) => this.achDocsErrorHandler(error$, completion$, error)
      );
  }

  public buildAchDocsParams(partyId: string, companyInfo: string): HttpParams {
    return new HttpParams()
      .set(HttpParamEnum.vendorId, partyId)
      .set(HttpParamEnum.companyInfo, companyInfo);
  }

  public achDocsSuccessHandler(
    achInfoData$: BehaviorSubject<AchDocuments[]>,
    error$: Subject<boolean>,
    completion$: Subject<boolean>,
    data: any
  ): void {
    let achDocs: AchDocuments[] = [];
    this._loggerService.action('Successfully obtain ach Information data');
    achDocs = this._proficeFactoryService.getAchInfoFromPayload(data);
    completion$.next(true);
    error$.next(false);
    achInfoData$.next(achDocs);
  }

  public achDocsErrorHandler(error$: Subject<boolean>, completion$: Subject<boolean>, error?: any): void {
    this._loggerService.error('Unable to retrieve ach Information data');
    completion$.next(true);
    error$.next(true);
  }
}
