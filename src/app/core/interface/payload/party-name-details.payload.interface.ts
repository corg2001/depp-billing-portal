import { PersonNamePayloadInterface } from './person-name.payload.interface';

export interface PartyNameDetailsPayloadInterface {
  readonly organization_name?: NameInterface;
  readonly person_name?: PersonNamePayloadInterface;
}


export interface NameInterface {
  readonly name?: string;
}