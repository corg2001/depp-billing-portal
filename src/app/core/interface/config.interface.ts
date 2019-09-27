import { AddressInterface } from './address.interface';

export interface ConfigInterface {
  readonly token: string;
  readonly partyId: string;
  readonly companyInfo: string;
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
