import { AssociationPayloadInterface } from './association.payload.interface';

export interface AssociationWrapperPayloadInterface {
    readonly _association?: AssociationPayloadInterface[];
}