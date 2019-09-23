import { AccountInformationPayloadInterface } from './account-information.payload.interface';
import { CompanyInfoPayloadInterface } from './company-info.payload.interface';

export interface AssociationPayloadInterface {
  readonly account_information: AccountInformationPayloadInterface;
  readonly company_info: CompanyInfoPayloadInterface;
  readonly is_admin?: boolean;
  readonly record_id?: string;
  readonly record_version?: string;
}
