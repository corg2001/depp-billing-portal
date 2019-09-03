import { AgreementDetails } from './agreement-details.model';
import { RateDetailsInterface } from '../interface/rate-details.interface';
import * as Money from 'js-money';

export class RateDetails  extends AgreementDetails implements RateDetailsInterface {
    private _description: string;

    constructor(description: string, rate: Money, unit: string) {
        super(rate, unit);
        this._description = description;
    }

    public get description(): string {
        return this._description;
    }

    public set description(newValue: string) {
        this._description = newValue;
    }
}