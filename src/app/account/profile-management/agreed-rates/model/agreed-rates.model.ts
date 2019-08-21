import { AgreedRatesInterface } from '../interface/agreed-rates.interface';


export class AgreedRates implements AgreedRatesInterface {
  private _item: string;
  private _trade: string;
  private _agreedRate: string;
  constructor(
    item?: string,
    trade?: string,
    agreedRate?: string
  ) {
    this._item = item;
    this._trade = trade;
    this._agreedRate = agreedRate;
  }
  get item(): string {
    return this._item;
  }

  get trade(): string {
    return this._trade;
  }

  get agreedRate(): string {
    return this._agreedRate;
  }

  set item(item: string) {
    this._item = item;
  }

  set trade(trade: string) {
    this._trade = trade;
  }

  set agreedRate(agreedRate: string) {
    this._agreedRate = agreedRate;
  }
}
