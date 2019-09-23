import { AddressPayloadInterface } from './address.payload.interface';
import { AssociationWrapperPayloadInterface } from './association-wrapper.payload.interface';
import { AxUserPayloadInterface } from './ax-user.payload.interface';
import { PartyNameDetailsPayloadInterface } from './party-name-details.payload.interface';
import { PhonesPayloadInterface } from './phones.payload.interface';

export interface PartyDetailsPayloadInterface {
  readonly addresses?: AddressPayloadInterface[];
  readonly associations?: AssociationWrapperPayloadInterface;
  readonly emails: AxUserPayloadInterface[];
  readonly faxes: AxUserPayloadInterface[];
  readonly party_name_details: PartyNameDetailsPayloadInterface;
  readonly party_type?: string;
  readonly phones: PhonesPayloadInterface[];
}
