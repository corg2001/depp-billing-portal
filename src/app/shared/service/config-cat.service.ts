import { Injectable } from '@angular/core';
import * as configcat from 'configcat-js';
import { Observable, from, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class ConfigCatService {
    private _maintenanceClient = configcat.getClient(environment.configcat.maintenance.key);
    private _monitoringClient = configcat.getClient(environment.configcat.monitoring.key);
    constructor() { }

    public checkMaintenance(): Observable<boolean> {
        return from(this._maintenanceClient.getValueAsync(environment.configcat.maintenance.maintenance, false));
    }

    public getDynatraceSrc(): Observable<any> {
        return from(this._monitoringClient.getValueAsync(environment.configcat.monitoring.dynatrace, ''));
    }

}
