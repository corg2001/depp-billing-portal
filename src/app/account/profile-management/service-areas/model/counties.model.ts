import { ServiceAreaDetails } from './service-areas-details.model';
import { CountiesInterface } from '../interface/counties.interface';

export class Counties implements CountiesInterface {
  private _countyName: string;
  private _serviceAreaDetails: ServiceAreaDetails[];
  constructor(countyName: string, serviceAreaDetails: ServiceAreaDetails[]) {
    this._countyName = countyName;
    this._serviceAreaDetails = serviceAreaDetails;
  }

  public get countyName(): string {
    return this._countyName;
  }

  public get serviceAreaDetails(): ServiceAreaDetails[] {
    return this._serviceAreaDetails;
  }

  public set countyName(newValue: string) {
    this._countyName = newValue;
  }

  public set serviceAreaDetails(newValue: ServiceAreaDetails[]) {
    this._serviceAreaDetails = newValue;
  }
}
