import * as Money from 'js-money';
import { AgreementDetailsInterface } from './agreement-details.interface';

export interface RateDetailsInterface extends AgreementDetailsInterface {
    readonly description: string;
}