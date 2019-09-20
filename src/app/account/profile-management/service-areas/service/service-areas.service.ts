import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject, BehaviorSubject, zip } from 'rxjs';
import { ConfigService } from 'src/app/core/config.service';
import { LoggerService } from 'src/app/core/logger.service';
import { ServiceAreasAbstractService } from './abstract/service-areas-abstract.service';
import { HttpParamEnum } from 'src/app/shared/enums/http-params.enums';
import { ServiceAreasFactoryAbstractService } from './factory/abstract/service-areas.factory.abstract.service';
import { ServiceAreasInterface } from '../interface/service-areas.interface';
import { ServiceAreaDetailsInterface } from '../interface/service-area-details.interface';

@Injectable({
  providedIn: 'root'
})
export class ServiceAreasService implements ServiceAreasAbstractService {
  constructor(
    private _http: HttpClient,
    private _configService: ConfigService,
    private _loggerService: LoggerService,
    private _serviceAreasfactoryService: ServiceAreasFactoryAbstractService
  ) {}

  public getServiceAreas(
    serviceAreasData$: Subject<ServiceAreasInterface[]>,
    completion$: Subject<boolean>,
    error$: Subject<boolean>,
    errorMessage$?: Subject<string>
  ): void {
    const partyId: string = this._configService.getVendorId();
    const companyInfo: string = this._configService.getCompanyInfo();
    const params: HttpParams = this.buildSerbiceAreasParams(
      partyId,
      companyInfo
    );
    this._http.get(environment.serviceAreasUrl, { params }).subscribe(
      (data: any) => {
        this.serviceAreasSuccessHandler(
          serviceAreasData$,
          completion$,
          error$,
          data
        );
      },
      (error: any) => {
        this.serviceAreasErrorHandler(
          completion$,
          error$,
          error,
          errorMessage$
        );
      }
    );
  }

  public buildSerbiceAreasParams(
    partyId: string,
    companyInfo: string
  ): HttpParams {
    return new HttpParams()
      .set(HttpParamEnum.vendorId, partyId)
      .set(HttpParamEnum.companyInfo, companyInfo);
  }

  public serviceAreasSuccessHandler(
    serviceAreasData$: Subject<ServiceAreasInterface[]>,
    completion$: Subject<boolean>,
    error$: Subject<boolean>,
    data: any
  ): void {
    this._loggerService.action('Successfully obtain service area data');
    completion$.next(true);
    error$.next(false);
    serviceAreasData$.next(
      this._serviceAreasfactoryService.getServiceAreasFromPayload(data)
    );
  }

  public serviceAreasErrorHandler(
    completion$: Subject<boolean>,
    error$: Subject<boolean>,
    error?: any,
    errorMessage$?: Subject<string>
  ): void {
    this._loggerService.action('Unable to reterive service Areas data');
    completion$.next(true);
    error$.next(true);
    errorMessage$.next(error);
  }

  public search(
    serviceAreaDetails: ServiceAreaDetailsInterface[],
    zipcode?: string,
    skillType?: string
  ): ServiceAreaDetailsInterface[] {
    return zipcode ? this.searchZipCodes(serviceAreaDetails, zipcode)
     : skillType ? this.searchSkillType(serviceAreaDetails, skillType) : serviceAreaDetails;
  }

  public searchZipCodes(serviceAreaDetails: ServiceAreaDetailsInterface[],
    zipcode?: string): ServiceAreaDetailsInterface[] {
      const _serviceAreas: ServiceAreaDetailsInterface[] = [];
      const zipcodeInput = zipcode.toLowerCase();
      serviceAreaDetails.forEach((serviceAreaDetail: ServiceAreaDetailsInterface) => {
        if (serviceAreaDetail.zip.toLowerCase().includes(zipcodeInput) || serviceAreaDetail.zip.toLowerCase() === zipcode) {
          _serviceAreas.push(serviceAreaDetail);
        }
      });
      return _serviceAreas;
    }

    public searchSkillType(serviceAreaDetails: ServiceAreaDetailsInterface[],
      skillType?: string) {
        const _ServicesAreas: ServiceAreaDetailsInterface[] = [];
        const skillTypeInput = skillType.toLowerCase();
        serviceAreaDetails.forEach((serviceAreaDetail: ServiceAreaDetailsInterface) => {
          if (serviceAreaDetail.skillType.toLowerCase().includes(skillTypeInput)
          || serviceAreaDetail.skillType.toLowerCase() === skillTypeInput) {
            _ServicesAreas.push(serviceAreaDetail);
          }
        });
        return _ServicesAreas;
      }
}
