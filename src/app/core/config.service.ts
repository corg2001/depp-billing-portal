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
      token: this.getTokenFromSession(),
      partyId: this.getPartyIdFromSession(),
      companyInfo: this.getCompanyInfoFromSession()
    };
  }

  public showConfig(): void {
    console.log('DEBUGGING - config: ');
    console.log(this.config);
  }

  public getToken(): string {
    return this.config.token;
  }

  public getPartyId(): string {
    return this.config.partyId;
  }

  public getCompanyInfo(): string {
    return this.config.companyInfo;
  }

  private getTokenFromSession(): string {
    return localStorage.getItem('token');
  }

  private getPartyIdFromSession(): string {
    return localStorage.getItem('partyId');
  }

  private getCompanyInfoFromSession(): string {
    // TODO: fix this and get it from proper factory
    return 'eyJjb21wYW55X2lkIjoiSUwwMyIsImJyYW5kcyI6eyJicmFuZF9pZHMiOlsiSFdBIl19fQ==';
  }

}
