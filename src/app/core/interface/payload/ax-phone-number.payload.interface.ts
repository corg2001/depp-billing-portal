import { PhoneTypeEnum } from '../../enums/phone-type.enum';

export interface AxPhoneNumberPayloadInterface {
  readonly value: string;
  readonly type: PhoneTypeEnum;
  readonly extension?: string;
}
