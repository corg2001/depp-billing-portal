import { AssociationRecordTypeEnum } from '../../enums/association-record-type.enum';
import { AxPhoneNumberPayloadInterface } from './ax-phone-number.payload.interface';
import { AxEmailPayloadInterface } from './ax-email.payload.interface';
import { CompanyInfoPayloadInterface } from './company-info.payload.interface';

export interface ContactPayloadInterface {
    readonly first_name: string;
    readonly last_name: string;
    readonly company_info?: CompanyInfoPayloadInterface;
    readonly account_id?: string;
    readonly account_type?: AssociationRecordTypeEnum;
    readonly phone?: AxPhoneNumberPayloadInterface;
    readonly postal_code?: string;
    readonly state?: string;
    readonly email: AxEmailPayloadInterface;
    readonly message: string;
}