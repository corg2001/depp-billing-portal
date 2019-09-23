import { BrandsPayloadInterface } from './brands.payload.interface';

export interface CompanyInfoPayloadInterface {
    readonly brands: BrandsPayloadInterface[];
    readonly company_id: string;
}