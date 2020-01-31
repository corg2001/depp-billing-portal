import { AddressInterface } from './address.interface';
import { CompanyInfoPayloadInterface } from './payload/company-info.payload.interface';
import { AssociationPayloadInterface } from './payload/association.payload.interface';

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
  readonly hasMultiAssociations: boolean;
  readonly multipleAssociations: AssociationPayloadInterface[]
}
