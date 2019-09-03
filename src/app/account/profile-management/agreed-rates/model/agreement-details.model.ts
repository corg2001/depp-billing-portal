import * as Money from 'js-money';

export class AgreementDetails {
  private _rate: Money;
  private _unit: string;

  constructor(rate: Money, unit: string) {
    this._rate = rate;
    this._unit = unit;
  }

  public get rate(): Money {
    return this._rate;
  }

  public get unit(): string {
    return this._unit;
  }

  public set rate(newValue: Money) {
    this._rate = newValue;
  }

  public set unit(newValue: string) {
    this._unit = newValue;
  }
}
