import { Injectable } from '@angular/core';
import { ServiceAreasPayloadInterface } from '../../interface/payload/service-areas.payload.interface';
import { ServiceAreas } from '../../model/service-areas.model';
import { Counties } from '../../model/counties.model';
import { CountiesPayloadInterface } from '../../interface/payload/counties.payload.interface';
import { ServiceAreaDetails } from '../../model/service-areas-details.model';
import { ServiceAreasDetailsPayloadInterface } from '../../interface/payload/service-area-details.payload.interface';
import { count } from 'rxjs/operators';
import { ServiceAreasFactoryAbstractService } from './abstract/service-areas.factory.abstract.service';
import { ServiceAreaDetailsInterface } from '../../interface/service-area-details.interface';
import { CountiesInterface } from '../../interface/counties.interface';
import { ServiceAreasInterface } from '../../interface/service-areas.interface';

@Injectable({
  providedIn: 'root'
})
export class ServiceAreasFactoryService
  implements ServiceAreasFactoryAbstractService {
  constructor() {}

  public getServiceAreasFromPayload(
    payload: ServiceAreasPayloadInterface[]
  ): ServiceAreasInterface[] {
    const serviceAreasList: ServiceAreasInterface[] = [];
    let stateCode: string;
    let county: CountiesInterface;
    const countiesList: CountiesInterface[] = [];
    payload.forEach((serviceAreasPayload: ServiceAreasPayloadInterface) => {
      stateCode = serviceAreasPayload.state_code;
      serviceAreasPayload.counties.forEach(
        (counties: CountiesPayloadInterface) => {
          const countyName = counties.county_name;
          const serviceAreaDetaisList = this._getServiceDetails(
            counties.service_area_details
          );
          county = {
            countyName: countyName,
            serviceAreaDetails: serviceAreaDetaisList
          };
          // county = new Counties(countyName, serviceAreaDetaisList);
          countiesList.push(county);
        }
      );

      const serviceArea: ServiceAreasInterface = {
        counties: countiesList,
        stateCode: stateCode
      };
      // const serviceArea = new ServiceAreas(countiesList, stateCode);
      serviceAreasList.push(serviceArea);
    });
    return serviceAreasList;
  }

  private _getServiceDetails(
    serviceAreaDetails: ServiceAreasDetailsPayloadInterface[]
  ): ServiceAreaDetailsInterface[] {
    const serviceAreaDetailList: ServiceAreaDetailsInterface[] = [];
    serviceAreaDetails.forEach(
      (payloadServiceAreaDetails: ServiceAreasDetailsPayloadInterface) => {
        const serviceAreaDetail: ServiceAreaDetailsInterface = {
          isActive: payloadServiceAreaDetails.is_active,
          serviceAreaType: payloadServiceAreaDetails.service_area_type,
          skillType: payloadServiceAreaDetails.skill_type,
          zip: payloadServiceAreaDetails.zip
        };
        serviceAreaDetailList.push(serviceAreaDetail);
      }
    );
    return serviceAreaDetailList;
  }
}
