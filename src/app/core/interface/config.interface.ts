import { AddressInterface } from './address.interface';
import { CompanyInfoPayloadInterface } from './payload/company-info.payload.interface';

export interface ConfigInterface {
  readonly token: string;
  readonly vendorId: string;
  readonly companyInfo: string;
  readonly companyInfoObj: string;
  readonly partyName: string;
  readonly companyName: string;
  readonly email: string;
  readonly taxId: string;
  readonly phoneNumber: string;
  readonly businessAddress: AddressInterface;
  readonly mailingAddress: AddressInterface;
  readonly accountNumber: string;
  readonly username: string;
  readonly password: string;
}
