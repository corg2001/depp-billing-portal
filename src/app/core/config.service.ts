import { Injectable } from '@angular/core';
import { LoggerService } from './logger.service';
import { LocalStorageEnum } from './enums/local-storage.enums';
import { ConfigInterface } from './interface/config.interface';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private _config: ConfigInterface;

  constructor(private loggerService: LoggerService) {
    this.loggerService.important('config service has been provided');
  }

  public init(): void {
    this._config = {
      token: this._getTokenFromSession(),
      partyId: this._getVendorIdFromSession(),
      companyInfo: this._getCompanyInfoFromSession(),
      partyName: this._getPartyNameFromSession(),
      companyName: this._getCompanyNameFromSession(),
      email: this._getEmailFromSession(),
      taxId: this._getTaxIdFromSession(),
      phoneNumber: this._getPhoneNumberFromSession(),
      fsaLocationId: this._getFasLocationFromSession(),
      address1: this._getAddress1FromSession(),
      address2: this._getAddress2FromSession(),
      unit: this._getUnitFromSession(),
      city: this._getCityFromSession(),
      state: this._getStateFromSession(),
      postalCode: this._getPostalCodeFromSession(),
      country: this._getCountryFromSession(),
      accountNumber: this._getAccountNumberFromSession(),
      username: this._getUserNameFromSession(),
      password: this._getPasswordFromSession()
    };
  }

  public showConfig(): void {
    console.log('DEBUGGING - config: ');
    console.log(this._config);
  }

  public getToken(): string {
    return this._config.token;
  }
  // chnaged this to vendorId from partyId
  public getVendorId(): string {
    return this._config.partyId;
  }

  public getCompanyInfo(): string {
    return this._config.companyInfo;
  }

  public getPartyName(): string {
    return this._config.partyName;
  }

  public getcompanyName(): string {
    return this._config.companyName;
  }

  public getAccountNumber(): string {
    return this._config.accountNumber;
  }

  public getEmail(): string {
    return this._config.email;
  }

  public getTaxId(): string {
    return this._config.taxId;
  }

  public getPhoneNumber(): string {
    return this._config.phoneNumber;
  }

  public getAddress1(): string {
    return this._config.address1;
  }

  public getAddress2(): string {
    return this._config.address2;
  }

  public getUnit(): string {
    return this._config.unit;
  }

  public getCity(): string {
    return this._config.city;
  }

  public getState(): string {
    return this._config.state;
  }

  public getPostalCode(): string {
    return this._config.postalCode;
  }

  public getCountry(): string {
    return this._config.country;
  }

  public getPassword(): string {
    return this._config.password;
  }

  public getUserName(): string {
    return this._config.username;
  }

  private _getTokenFromSession(): string {
    return localStorage.getItem(LocalStorageEnum.Token);
  }

  private _getVendorIdFromSession(): string {
    return localStorage.getItem(LocalStorageEnum.VendorID);
  }

  private _getPartyNameFromSession(): string {
    return localStorage.getItem(LocalStorageEnum.PartyName);
  }

  private _getCompanyNameFromSession(): string {
    return localStorage.getItem(LocalStorageEnum.CompanyName);
  }

  private _getCompanyInfoFromSession(): string {
    // TODO: fix this and get it from proper factory
    return 'eyJjb21wYW55X2lkIjoiSUwwMyIsImJyYW5kcyI6eyJicmFuZF9pZHMiOlsiSFdBIl19fQ==';
  }

  private _getEmailFromSession(): string {
    return localStorage.getItem(LocalStorageEnum.Email);
  }

  private _getAccountNumberFromSession(): string {
    return localStorage.getItem(LocalStorageEnum.AccountNumber);
  }

  private _getTaxIdFromSession(): string {
    return localStorage.getItem(LocalStorageEnum.TaxId);
  }

  private _getPhoneNumberFromSession(): string {
    return localStorage.getItem(LocalStorageEnum.PhoneNumber);
  }

  private _getAddress1FromSession(): string {
    return localStorage.getItem(LocalStorageEnum.Address1);
  }

  private _getAddress2FromSession(): string {
    return localStorage.getItem(LocalStorageEnum.Address2);
  }

  private _getUnitFromSession(): string {
    return localStorage.getItem(LocalStorageEnum.Unit);
  }

  private _getStateFromSession(): string {
    return localStorage.getItem(LocalStorageEnum.State);
  }

  private _getCityFromSession(): string {
    return localStorage.getItem(LocalStorageEnum.City);
  }

  private _getPostalCodeFromSession(): string {
    return localStorage.getItem(LocalStorageEnum.PostalCode);
  }

  private _getCountryFromSession(): string {
    return localStorage.getItem(LocalStorageEnum.Country);
  }

  private _getFasLocationFromSession(): string {
    return localStorage.getItem(LocalStorageEnum.FasLocationId);
  }
  private _getUserNameFromSession(): string {
    return localStorage.getItem(LocalStorageEnum.UserName);
  }

  private _getPasswordFromSession(): string {
    return localStorage.getItem(LocalStorageEnum.Password);
  }
}
