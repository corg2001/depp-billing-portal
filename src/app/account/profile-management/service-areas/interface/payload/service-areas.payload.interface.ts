import { CountiesPayloadInterface } from './counties.payload.interface';

export interface ServiceAreasPayloadInterface{
  counties: CountiesPayloadInterface[];
  state_code: string;
  }