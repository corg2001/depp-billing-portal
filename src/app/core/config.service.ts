import { Injectable } from '@angular/core';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private config: any = {};

  constructor( private loggerService: LoggerService) {
    this.loggerService.important('config service has been provided');
  }

  public init(): void {
    this.config = {
      token: this._getTokenFromSession(),
      partyId: this._getVendorIdFromSession(),
      companyInfo: this._getCompanyInfoFromSession(),
      partyName: this._getPartyNameFromSession()
    };
  }

  public showConfig(): void {
    console.log('DEBUGGING - config: ');
    console.log(this.config);
  }

  public getToken(): string {
    return this.config.token;
  }
// chnaged this to vendorId from partyId
  public getVendorId(): string {
    return this.config.partyId;
  }

  public getCompanyInfo(): string {
    return this.config.companyInfo;
  }

  public getPartyName(): string {
    return this.config.partyName;
  }

  private _getTokenFromSession(): string {
    return localStorage.getItem('token');
  }

  private _getVendorIdFromSession(): string {
    return localStorage.getItem('partyId');
  }

  private _getPartyNameFromSession(): string  {
    return localStorage.getItem('partyName');
  }

  private _getCompanyInfoFromSession(): string {
    // TODO: fix this and get it from proper factory
    return 'eyJjb21wYW55X2lkIjoiSUwwMyIsImJyYW5kcyI6eyJicmFuZF9pZHMiOlsiSFdBIl19fQ==';
  }

}
