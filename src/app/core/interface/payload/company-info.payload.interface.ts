import { BrandsPayloadInterface } from './brands.payload.interface';

export interface  CompanyInfoPayloadInterface {
    readonly company_id: string;
    readonly brands: BrandsPayloadInterface;
}