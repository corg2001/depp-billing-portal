import { ServiceAreaDetailsInterface } from './service-area-details.interface';

export interface CountiesInterface {
    readonly countyName: string;
    readonly serviceAreaDetails: ServiceAreaDetailsInterface[];
}
