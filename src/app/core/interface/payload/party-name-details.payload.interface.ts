import { PersonNamePayloadInterface } from './person-name.payload.interface';

export interface PartyNameDetailsPayloadInterface {
  readonly organization_name?: string;
  readonly person_name?: PersonNamePayloadInterface;
}
