import { AgreementDetailsInterface } from '../agreement-details.interface';
export interface TradeAgreementDetailsPayloadInterface extends AgreementDetailsInterface{
    readonly item_description: string;
    readonly trade?: string;
}