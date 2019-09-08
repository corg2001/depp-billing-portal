import { CountiesPayloadInterface } from '../interface/payload/counties.payload.interface';
import { Counties } from './counties.model';
import { ServiceAreasInterface } from '../interface/service-areas.interface';

export class ServiceAreas implements ServiceAreasInterface {
    private _stateCode: string;
    private _counties: Counties[];

    constructor(counties: Counties[], stateCode: string) {
        this._counties = counties;
        this._stateCode = stateCode;
    }

    public get stateCode(): string {
        return this._stateCode;
    }

    public get counties(): Counties[] {
        return this._counties;
    }

    public set stateCode(newValue: string) {
        this._stateCode = newValue;
    }

    public set counties(newValue: Counties[]) {
        this._counties = newValue;
    }
}
