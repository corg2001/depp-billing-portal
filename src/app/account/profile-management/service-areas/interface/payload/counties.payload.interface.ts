import { ServiceAreasDetailsPayloadInterface } from './service-area-details.payload.interface';

export interface CountiesPayloadInterface {
    readonly county_name: string;
    readonly service_area_details: ServiceAreasDetailsPayloadInterface[];
}