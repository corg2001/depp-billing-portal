import { CountiesInterface } from './counties.interface';

export interface ServiceAreasInterface {
  readonly counties: CountiesInterface[];
  readonly stateCode: string;
}
