import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import {map} from 'rxjs/operators';

@Injectable()
export class MaintenanceService  {
  private cacheDuration: number = 10;
  private cacheKey: string = 'ConfigCat';
  private loading: boolean = false;

  constructor(private _http: HttpClient) {}

  public async checkMaintenance(): Promise<boolean> {
    this.setLoading(true);
    const flag: any = await this.getConfigs();
    this.setLoading(false);    
    

    return flag;
  }

  public setLoading(load: boolean){
    this.loading = load;
  }

  public isLoading(){
    return this.loading;
  }

  private getConfigs():  Promise<any> {
    const flagName: string = environment.configcat.maintenance;    
    const brandId: string = environment.core.brandId; 
    const configCatKey: string = environment.configcat.key;
    const cachedData: any = localStorage.getItem(`${this.cacheKey}-${brandId}-${configCatKey}-${flagName}`);    
    if (cachedData) {
      const data: any = JSON.parse(cachedData);
      if (data.expiredTime && moment().isBefore(data.expiredTime)) {
        return Promise.resolve(data.flag);
      }
    }
    
    return this._http.get(`https://cdn.configcat.com/configuration-files/${environment.configcat.key}/config_v4.json`).pipe(
      map((flags: any) => {
        let  flag = false;
        if (!!flags[flagName]) {
          flag = flags[flagName].v || false;
        }
        const expiredTime: Date = moment().add(this.cacheDuration, 'seconds').toDate();
        const  dataCached: any = { flag, expiredTime };
        localStorage.setItem(`${this.cacheKey}-${brandId}-${configCatKey}-${flagName}`, JSON.stringify(dataCached));

        return dataCached.flag;
      })
    ).toPromise();
  }
}
