import { Injectable } from '@angular/core';
import { Observable, Subject, Subscriber } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';

// development artifacts
import { AuthenticationService } from './authentication.service';
import { LoggerService } from './logger.service';
import { LogoutService } from './logout.service';
import { environment } from 'src/environments/environment';
import { PartyDetailsPayloadInterface } from './interface/payload/party-details.payload.interface';
import { AssociationPayloadInterface } from './interface/payload/association.payload.interface';
import { LocalStorageEnum } from './enums/local-storage.enums';



@Injectable({
  providedIn: 'root'
})
export class PartyService {
  private _isMultiAssociations: boolean;
  constructor(
    private authService: AuthenticationService,
    private _http: HttpClient,
    private loggerService: LoggerService,
    private logoutService: LogoutService
  ) { }

  public init(): Observable<boolean> {
    return new Observable(observer => {
      this.getPartyDetails(observer);
    });
  }

  private getPartyDetails(subscription: Subscriber<boolean>): any {
    this._http.get(environment.partyDetailsUrl).subscribe(
      (responseData: PartyDetailsPayloadInterface) => {
        this.getPartyDetailsSuccessHandler(subscription, responseData);
      },
      (responseError: Observable<HttpErrorResponse>) => {
        this.getPartyDetailsFailureHandler(subscription, responseError);
      }
    );
  }

  private getPartyDetailsSuccessHandler(
    subscription: Subscriber<boolean>,
    responseData: PartyDetailsPayloadInterface
    // responseData: Observable<HttpResponse<PartyDetailsPayload>>
  ): void {
    this.loggerService.action(' Party details successfully obtained ...');
    this.partyDetailsHandler(subscription, responseData);
    subscription.next(true);
    subscription.complete();
  }

  private getPartyDetailsFailureHandler(
    subscription: Subscriber<boolean>,
    responseError?: any
  ): void {
    this.loggerService.error('Unable to retrieve party details');
    subscription.next(false);
    subscription.complete();
    this.logoutService.logout();
  }

  public partyDetailsHandler(
    subscription: Subscriber<boolean>,
    data: PartyDetailsPayloadInterface
  ): void {

    const associations: AssociationPayloadInterface =
      data.associations._association[0];
    data.associations._association.length > 1 ? this._isMultiAssociations = true : this._isMultiAssociations = false;

    this._hasMultiAssociations = this._isMultiAssociations;

    if (this._isMultiAssociations) {
      this._multipleAssociations = data.associations._association;
    }

    this._setLocalVendorId(associations);
    if (data.party_name_details.person_name !== null) {
      this._setLocalPartyName(data);
    }
    if (data.party_name_details.organization_name !== null) {
      this._setLocalCompanyName(data);
    }

    if (data.associations._association[0].account_information) {
      this._SetLocalAccountNumber(data);
      this._SetLocalTaxId(data);
    }

    if (data.associations._association[0].company_info) {
      this._SetLocalCompanyInfo(data);
    }

    if (data.emails[0]) {
      this._SetLocalEmail(data);
    }
    if (data.phones[0]) {
      this._setLocalPhoneNumber(data);
    }

    if (!this.validateLocalStorage()) {
      this.loggerService.error('Unable to get vendorId from payload');
    }

    if (data.addresses[0]) {
      this._setLocalBusinessAddress1(data);
      this._setLocalBusinessAddress2(data);
      this._setLocalBusinessAddressUnit(data);
      this._setLocalBusinessAddressCity(data);
      this._setLocalBusinessAddressCity(data);
      this._setLocalBusinessAddressCountry(data);
      this._setLocalBusinessAddressPostalCode(data);
      this._setLocalBusinessAddressState(data);
      this._setLocalBusinessAddressFsaLocationId(data);
      this._setLocalBusinessAxLocationId(data);
      this._setLocalBusinessAxRecordId(data);
    }
    if (data.addresses[1]) {
      this._setLocalMailingAddress1(data);
      this._setLocalMailingAddress2(data);
      this._setLocalMailingAddressUnit(data);
      this._setLocalMailingAddressCity(data);
      this._setLocalMailingAddressCountry(data);
      this._setLocalMailingAddressPostalCode(data);
      this._setLocalMailingAddressState(data);
      this._setLocalMailingAddressFsaLocationId(data);
      this._setLocalMailingAxLocationId(data);
      this._setLocalMailingAxRecordId(data);
    }
    subscription.next(true);
    subscription.complete();
  }

  private validateLocalStorage(): boolean {
    return localStorage.getItem(LocalStorageEnum.VendorID) ? true : false;
  }

  private _SetLocalAccountNumber(
    partyDetails: PartyDetailsPayloadInterface
  ): void {
    localStorage.setItem(
      LocalStorageEnum.AccountNumber,
      partyDetails.associations._association[0].account_information.account_id
    );
  }
  private _SetLocalCompanyInfo(partyDetails: PartyDetailsPayloadInterface): void {

    localStorage.setItem(LocalStorageEnum.CompanyInfo, JSON.stringify(partyDetails.associations._association[0].company_info));
  }

  private _SetLocalEmail(
    partyDetails: PartyDetailsPayloadInterface
  ): void {
    localStorage.setItem(LocalStorageEnum.Email, partyDetails.emails[0].value);
  }
  private _SetLocalTaxId(
    partyDetails: PartyDetailsPayloadInterface
  ): void {
    localStorage.setItem(
      LocalStorageEnum.TaxId,
      partyDetails.associations._association[0].account_information.tax_id
    );
  }
  private _setLocalCompanyName(
    partyDetails: PartyDetailsPayloadInterface
  ): void {
    localStorage.setItem(
      LocalStorageEnum.CompanyName,
      partyDetails.party_name_details.organization_name
    );
  }
  private _setLocalPhoneNumber(
    partyDetails: PartyDetailsPayloadInterface
  ): void {
    localStorage.setItem(
      LocalStorageEnum.PhoneNumber,
      partyDetails.phones[0].value
    );
  }
  private _setLocalBusinessAddress1(
    partyDetails: PartyDetailsPayloadInterface
  ): void {
    localStorage.setItem(
      LocalStorageEnum.BusinessAddress1,
      partyDetails.addresses[0].address1
    );
  }

  private _setLocalBusinessAddress2(
    partyDetails: PartyDetailsPayloadInterface
  ): void {
    localStorage.setItem(
      LocalStorageEnum.BusinessAddress2,
      partyDetails.addresses[0].address2
    );
  }

  private _setLocalBusinessPurpose(
    partyDetails: PartyDetailsPayloadInterface
  ): void {
    localStorage.setItem(
      LocalStorageEnum.BuisnessAddressPurpose,
      partyDetails.addresses[0].purpose
    );
  }

  private _setLocalBusinessAddressUnit(
    partyDetails: PartyDetailsPayloadInterface
  ): void {
    localStorage.setItem(
      LocalStorageEnum.BusinessUnit,
      partyDetails.addresses[0].unit
    );
  }

  private _setLocalBusinessAddressPostalCode(
    partyDetails: PartyDetailsPayloadInterface
  ): void {
    localStorage.setItem(
      LocalStorageEnum.BusinessPostalCode,
      partyDetails.addresses[0].postal_code
    );
  }

  private _setLocalBusinessAddressCity(
    partyDetails: PartyDetailsPayloadInterface
  ): void {
    localStorage.setItem(
      LocalStorageEnum.BusinessCity,
      partyDetails.addresses[0].city
    );
  }

  private _setLocalBusinessAddressState(
    partyDetails: PartyDetailsPayloadInterface
  ): void {
    localStorage.setItem(
      LocalStorageEnum.BusinessState,
      partyDetails.addresses[0].state
    );
  }

  private _setLocalBusinessAddressCountry(
    partyDetails: PartyDetailsPayloadInterface
  ): void {
    localStorage.setItem(
      LocalStorageEnum.BusinessCountry,
      partyDetails.addresses[0].country
    );
  }

  private _setLocalBusinessAddressFsaLocationId(
    partyDetails: PartyDetailsPayloadInterface
  ): void {
    localStorage.setItem(
      LocalStorageEnum.BusinessFasLocationId,
      partyDetails.addresses[0].fsa_location_id
    );
  }

  private _setLocalBusinessAxLocationId(partyDetails: PartyDetailsPayloadInterface): void {
    localStorage.setItem(LocalStorageEnum.BusinessAxLocationId, partyDetails.addresses[0].ax_location_id);
  }

  private _setLocalBusinessAxRecordId(partyDetails: PartyDetailsPayloadInterface): void {
    localStorage.setItem(LocalStorageEnum.BusinessAxRecordId, partyDetails.addresses[0].ax_record_id);
  }

  private _setLocalMailingAddressFsaLocationId(
    partyDetails: PartyDetailsPayloadInterface
  ): void {
    localStorage.setItem(
      LocalStorageEnum.MailingFasLocationId,
      partyDetails.addresses[1].fsa_location_id
    );
  }

  private _setLocalMailingAddress1(partyDetails: PartyDetailsPayloadInterface): void {
    localStorage.setItem(
      LocalStorageEnum.MailingAddress1,
      partyDetails.addresses[1].address1
    );
  }

  private _setLocalMailingAddress2(partyDetails: PartyDetailsPayloadInterface): void {
    localStorage.setItem(
      LocalStorageEnum.MailingAddress2,
      partyDetails.addresses[1].address2
    );
  }

  private _setLocalMailingAddressUnit(
    partyDetails: PartyDetailsPayloadInterface
  ): void {
    localStorage.setItem(LocalStorageEnum.MailingUnit, partyDetails.addresses[1].unit);
  }

  private _setLocalMailingAddressPostalCode(
    partyDetails: PartyDetailsPayloadInterface
  ): void {
    localStorage.setItem(
      LocalStorageEnum.MailingPostalCode,
      partyDetails.addresses[1].postal_code
    );
  }

  private _setLocalMailingAddressCity(
    partyDetails: PartyDetailsPayloadInterface
  ): void {
    localStorage.setItem(LocalStorageEnum.MailingCity, partyDetails.addresses[1].city);
  }

  private _setLocalMailingAddressState(
    partyDetails: PartyDetailsPayloadInterface
  ): void {
    localStorage.setItem(
      LocalStorageEnum.MailingState,
      partyDetails.addresses[1].state
    );
  }


  private _setLocalMailingAddressCountry(
    partyDetails: PartyDetailsPayloadInterface
  ): void {
    localStorage.setItem(
      LocalStorageEnum.MailingCountry,
      partyDetails.addresses[1].country
    );
  }

  private _setLocalMailingAddressPurpose(
    partyDetails: PartyDetailsPayloadInterface
  ): void {
    localStorage.setItem(
      LocalStorageEnum.MailingAddressPurpose,
      partyDetails.addresses[1].purpose
    );
  }

  private _setLocalMailingAxLocationId(partyDetails: PartyDetailsPayloadInterface): void {
    localStorage.setItem(LocalStorageEnum.MailingAxLocationId, partyDetails.addresses[1].ax_location_id);
  }

  private _setLocalMailingAxRecordId(partyDetails: PartyDetailsPayloadInterface): void {
    localStorage.setItem(LocalStorageEnum.MailingAxRecordId, partyDetails.addresses[1].ax_record_id);
  }

  private _setLocalVendorId(association: AssociationPayloadInterface): void {
    localStorage.setItem(
      LocalStorageEnum.VendorID,
      association.account_information.account_id
    );
  }

  private _setLocalPartyName(partyDetails: PartyDetailsPayloadInterface): void {
    localStorage.setItem(
      LocalStorageEnum.PartyName,
      `${partyDetails.party_name_details.person_name.last_name},
      ${partyDetails.party_name_details.person_name.first_name}`
    );
  }
  private set _hasMultiAssociations(value: boolean) {

    localStorage.setItem(LocalStorageEnum.HasMultiAssociations, value.toString());
  }
  private set _multipleAssociations(value: AssociationPayloadInterface[]) {
    localStorage.setItem(LocalStorageEnum.MultiAssociations, JSON.stringify(value));
  }
}
