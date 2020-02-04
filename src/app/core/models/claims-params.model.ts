import { ClaimsParamsInterface } from '../interface/claims-params.interface';

export class ClaimsParams implements ClaimsParamsInterface {
    private _vendorId: string;
    private _companyInfo: string;
    constructor(companyInfo: string, vendorId: string) {
        this._vendorId = vendorId;
        this._companyInfo = companyInfo;
    }
    get vendorId(): string {
        return this._vendorId;
    }

    get companyInfo(): string {
        return this._companyInfo;
    }

    set vendorId(value: string) {
        this._vendorId = value;
    }

    set companyInfo(value: string) {
        this._companyInfo = value;
    }
}
