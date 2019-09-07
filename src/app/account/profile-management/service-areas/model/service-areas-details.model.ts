import { ServiceAreaDetailsInterface } from '../interface/service-area-details.interface';

export class ServiceAreaDetails implements ServiceAreaDetailsInterface {
  private _isActive: boolean;
  private _serviceAreaType: string;
  private _skillType: string;
  private _zip: string;

  constructor(
    isActive: boolean,
    serviceAreaType: string,
    skillType: string,
    zip: string
  ) {
    this._isActive = isActive;
    this._serviceAreaType = serviceAreaType;
    this._skillType = skillType;
    this._zip = zip;
  }

  public get isActive(): boolean {
      return this._isActive;
  }

  public get serviceAreaType(): string {
      return this._serviceAreaType;
  }

  public get skillType(): string {
      return this._skillType;
  }

  public get zip(): string {
      return this._zip;
  }

  public set isActive(newValue: boolean) {
      this._isActive = newValue;
  }

  public set serviceAreaType(newValue: string) {
      this._serviceAreaType = newValue;
  }

  public set skillType(newValue: string) {
      this._skillType = newValue;
  }

  public set zip(newValue: string) {
      this._zip = newValue;
  }
}
