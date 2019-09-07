import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ServiceAreaDetailsInterface } from '../../interface/service-area-details.interface';

@Injectable({
  providedIn: 'root'
})
export abstract class ServiceAreasAbstractService {
  constructor() {}
  abstract getServiceAreas(
    serviceAreasData$: Subject<any>,
    completion$: Subject<boolean>,
    error$: Subject<boolean>,
    errorMessage$?: Subject<string>
  ): void;

  abstract search(
    serviceAreaDetails: ServiceAreaDetailsInterface[],
    zipcode?: string,
    skillType?: string
  ): ServiceAreaDetailsInterface[];
}
