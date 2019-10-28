import { Injectable } from '@angular/core';
import { LoggerService } from './logger.service';
import { LocalStorageEnum } from './enums/local-storage.enums';
import { ConfigInterface } from './interface/config.interface';
import { AddressInterface } from './interface/address.interface';
import { CompanyInfoPayloadInterface } from './interface/payload/company-info.payload.interface';

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
      vendorId: this._getVendorIdFromSession(),
      companyInfo: this._getCompanyInfoFromSession(),
      companyInfoObj: this._getCompanyInfoFromLocalStorge(),
      partyName: this._getPartyNameFromSession(),
      companyName: this._getCompanyNameFromSession(),
      email: this._getEmailFromSession(),
      taxId: this._getTaxIdFromSession(),
      phoneNumber: this._getPhoneNumberFromSession(),
      businessAddress: this._getBusinessAddress(),
      mailingAddress: this._getMailingAddress(),
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
    return this._config.vendorId;
  }

  public getCompanyInfo(): string {
    return this._config.companyInfo;
  }

  public getCompanyInfoObj(): CompanyInfoPayloadInterface {
    return JSON.parse(this._config.companyInfoObj);
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
  public getBusinessAddress(): AddressInterface {
    return this._config.businessAddress;
  }

  public getMailingAddress(): AddressInterface {
    return this._config.mailingAddress;
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

  private _getCompanyInfoFromLocalStorge(): string {
    return localStorage.getItem(LocalStorageEnum.CompanyInfo);
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

  private _getBusinessAddress1FromSession(): string {
    return localStorage.getItem(LocalStorageEnum.BusinessAddress1);
  }

  private _getBusinessAddress2FromSession(): string {
    return localStorage.getItem(LocalStorageEnum.BusinessAddress2);
  }

  private _getBusinessUnitFromSession(): string {
    return localStorage.getItem(LocalStorageEnum.BusinessUnit);
  }

  private _getBusinessStateFromSession(): string {
    return localStorage.getItem(LocalStorageEnum.BusinessState);
  }

  private _getBusinessCityFromSession(): string {
    return localStorage.getItem(LocalStorageEnum.BusinessCity);
  }

  private _getBusinessPostalCodeFromSession(): string {
    return localStorage.getItem(LocalStorageEnum.BusinessPostalCode);
  }

  private _getBusinessCountryFromSession(): string {
    return localStorage.getItem(LocalStorageEnum.BusinessCountry);
  }

  private _getBusinessFasLocationFromSession(): string {
    return localStorage.getItem(LocalStorageEnum.BusinessFasLocationId);
  }

  private _getBusinessPurposeFromSession(): string {
    return localStorage.getItem(LocalStorageEnum.BuisnessAddressPurpose);
  }
  private _getBusinessAxLocationIdFromSession(): string {
    return localStorage.getItem(LocalStorageEnum.BusinessAxLocationId);
  }

  private _getBusinessAxRecordIdFromSession(): string {
    return localStorage.getItem(LocalStorageEnum.BusinessAxRecordId);
  }

  private _getMailingAddress1FromSession(): string {
    return localStorage.getItem(LocalStorageEnum.MailingAddress1);
  }

  private _getMailingAddress2FromSession(): string {
    return localStorage.getItem(LocalStorageEnum.MailingAddress2);
  }

  private _getMailingUnitFromSession(): string {
    return localStorage.getItem(LocalStorageEnum.MailingUnit);
  }

  private _getMailingStateFromSession(): string {
    return localStorage.getItem(LocalStorageEnum.MailingState);
  }

  private _getMailingCityFromSession(): string {
    return localStorage.getItem(LocalStorageEnum.MailingCity);
  }

  private _getMailingPostalCodeFromSession(): string {
    return localStorage.getItem(LocalStorageEnum.MailingPostalCode);
  }

  private _getMailingCountryFromSession(): string {
    return localStorage.getItem(LocalStorageEnum.MailingCountry);
  }

  private _getMailingFasLocationFromSession(): string {
    return localStorage.getItem(LocalStorageEnum.MailingFasLocationId);
  }

  private _getMailingPurposeFromSession(): string {
    return localStorage.getItem(LocalStorageEnum.MailingAddressPurpose);
  }
  private _getMailingAxLocationIdFromSession(): string {
    return localStorage.getItem(LocalStorageEnum.MailingAxLocationId);
  }

  private _getMailingAxRecordIdFromSession(): string {
    return localStorage.getItem(LocalStorageEnum.MailingAxRecordId);
  }

  private _getUserNameFromSession(): string {
    return localStorage.getItem(LocalStorageEnum.UserName);
  }

  private _getPasswordFromSession(): string {
    return localStorage.getItem(LocalStorageEnum.Password);
  }

  private _getBusinessAddress(): AddressInterface {
    return {
      address1: this._getBusinessAddress1FromSession(),
      address2: this._getBusinessAddress2FromSession(),
      unit: this._getBusinessUnitFromSession(),
      city: this._getBusinessCityFromSession(),
      state: this._getBusinessStateFromSession(),
      country: this._getBusinessCountryFromSession(),
      purpose: this._getBusinessPurposeFromSession(),
      axLocationId: this._getBusinessAxLocationIdFromSession(),
      axRecordId: this._getBusinessAxRecordIdFromSession(),
      fsaLocationId: this._getBusinessFasLocationFromSession(),
      postalCode: this._getBusinessPostalCodeFromSession()
    };
  }

  private _getMailingAddress(): AddressInterface {
    return {
      address1: this._getMailingAddress1FromSession(),
      address2: this._getMailingAddress2FromSession(),
      unit: this._getMailingUnitFromSession(),
      city: this._getMailingCityFromSession(),
      state: this._getMailingStateFromSession(),
      country: this._getMailingCountryFromSession(),
      purpose: this._getMailingPurposeFromSession(),
      axLocationId: this._getMailingAxLocationIdFromSession(),
      axRecordId: this._getMailingAxRecordIdFromSession(),
      fsaLocationId: this._getMailingFasLocationFromSession(),
      postalCode: this._getMailingPostalCodeFromSession()
    };
  }
}
