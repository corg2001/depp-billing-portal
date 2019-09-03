import { AgreementDetailsInterface } from './agreement-details.interface';

export interface TradeAgreementDetailsInterface extends AgreementDetailsInterface{
    readonly itemDescription: string;
    readonly trade?: string;
}