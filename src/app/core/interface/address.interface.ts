import { AddressBaseInterface } from './address.base.interface';

export interface AddressInterface extends AddressBaseInterface {
  readonly axLocationId?: string;
  readonly axRecordId?: string;
  readonly fsaLocationId?: string;
  readonly postalCode?: string;
}
