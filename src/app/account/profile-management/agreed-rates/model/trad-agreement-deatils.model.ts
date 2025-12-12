import * as Money from 'js-money';

import { AgreementDetailsInterface } from '../interface/agreement-details.interface';
import { TradeAgreementDetailsInterface } from '../interface/trade-agreement-deatils.interface';
import { AgreementDetails } from './agreement-details.model';

export class TradeAgreementDetails extends AgreementDetails
  implements TradeAgreementDetailsInterface {
  private _itemDescription: string;
  private _trade: string;

  constructor(rate: Money, unit: string, itemDescription: string, trade?: string) {
    super(rate, unit);
    this._itemDescription = itemDescription;
    this._trade = trade;
  }

  public get itemDescription(): string {
    return this._itemDescription;
  }

  public get trade(): string {
    return this._trade;
  }

  public set itemDescription(newValue: string) {
    this._itemDescription = newValue;
  }

  public set trade(newValue: string) {
    this._trade = newValue;
  }
}
