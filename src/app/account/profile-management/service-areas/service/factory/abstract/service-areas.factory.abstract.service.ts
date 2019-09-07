import { Injectable } from '@angular/core';
import { ServiceAreasPayloadInterface } from '../../../interface/payload/service-areas.payload.interface';
import { ServiceAreas } from '../../../model/service-areas.model';
import { ServiceAreasInterface } from '../../../interface/service-areas.interface';

@Injectable({
  providedIn: 'root'
})
export abstract class ServiceAreasFactoryAbstractService {

  constructor() { }

  abstract getServiceAreasFromPayload(
    payload: ServiceAreasPayloadInterface[]
  ): ServiceAreasInterface[];
}
