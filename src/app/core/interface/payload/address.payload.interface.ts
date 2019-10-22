import { AddressBaseInterface } from '../address.base.interface';

export interface AddressPayloadInterface extends AddressBaseInterface {
  readonly ax_location_id?: string;
  readonly ax_record_id?: string;
  readonly fsa_location_id?: string;
  readonly postal_code?: string;
}
