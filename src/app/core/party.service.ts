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
import { PartyDetailsPayloadInterface } from './interface/party-details.payload.interface';
import { AssociationPayloadInterface } from './interface/association.payload.interface';
import { LocalStorageEnum } from './enums/local-storage.enums';

interface Address {
  address1: string;
  address2: string;
  zipCode: string;
  city: string;
  state: string;
  country: string;
}

@Injectable({
  providedIn: 'root'
})
export class PartyService {
  public address: Address[];

  constructor(
    private authService: AuthenticationService,
    private httpClient: HttpClient,
    private loggerService: LoggerService,
    private logoutService: LogoutService
  ) {}

  public init(): Observable<boolean> {
    return new Observable(observer => {
      this.getPartyDetails(observer);
    });
  }

  private getPartyDetails(subscription: Subscriber<boolean>): any {
    this.httpClient.get(environment.partyDetailsUrl).subscribe(
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
    // const associations: any = data['associations']['_association'][0];
    const associations: AssociationPayloadInterface =
      data.associations._association[0];
    this._setLocalVendorId(associations);
    if (data.party_name_details.person_name !== null) {
      this._setLocalPartyName(data);
    }
    if (data.party_name_details.organization_name !== null) {
      this._setLocalCompanyName(data);
    }

    if (data.associations._association[0].account_information) {
      this._setLocalStorageAccountNumber(data);
      this._setLocalStorageTaxId(data);
    }

    if (data.emails[0]) {
      this._setLocalStorageEmail(data);
    }
    if (data.phones[0]) {
      this._setLocalPhoneNumber(data);
    }

    if (!this.validateLocalStorage()) {
      this.loggerService.error('Unable to get partyId from payload');
    }

    if (data.addresses[0]) {
      this._setLocalAddress1(data);
      this._setLocalAddress2(data);
      this._setLocalAddressUnit(data);
      this._setLocalAddressCity(data);
      this._setLocalAddressCity(data);
      this._setLocalAddressCountry(data);
      this._setLocalAddressPostalCode(data);
      this._setLocalAddressState(data);
      this._setLocalAddressFsaLocationId(data);
    }
    subscription.next(true);
    subscription.complete();
  }

  private validateLocalStorage(): boolean {
    return localStorage.getItem(LocalStorageEnum.VendorID) ? true : false;
  }

  private _setLocalStorageAccountNumber(
    partyDetails: PartyDetailsPayloadInterface
  ): void {
    localStorage.setItem(
      LocalStorageEnum.AccountNumber,
      partyDetails.associations._association[0].account_information.account_id
    );
  }

  private _setLocalStorageEmail(
    partyDetails: PartyDetailsPayloadInterface
  ): void {
    localStorage.setItem(LocalStorageEnum.Email, partyDetails.emails[0].value);
  }
  private _setLocalStorageTaxId(
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
  private _setLocalAddress1(partyDetails: PartyDetailsPayloadInterface): void {
    localStorage.setItem(
      LocalStorageEnum.Address1,
      partyDetails.addresses[0].address1
    );
  }

  private _setLocalAddress2(partyDetails: PartyDetailsPayloadInterface): void {
    localStorage.setItem(
      LocalStorageEnum.Address2,
      partyDetails.addresses[0].address2
    );
  }

  private _setLocalAddressUnit(
    partyDetails: PartyDetailsPayloadInterface
  ): void {
    localStorage.setItem(LocalStorageEnum.Unit, partyDetails.addresses[0].unit);
  }

  private _setLocalAddressPostalCode(
    partyDetails: PartyDetailsPayloadInterface
  ): void {
    localStorage.setItem(
      LocalStorageEnum.PostalCode,
      partyDetails.addresses[0].postal_code
    );
  }

  private _setLocalAddressCity(
    partyDetails: PartyDetailsPayloadInterface
  ): void {
    localStorage.setItem(LocalStorageEnum.City, partyDetails.addresses[0].city);
  }

  private _setLocalAddressState(
    partyDetails: PartyDetailsPayloadInterface
  ): void {
    localStorage.setItem(
      LocalStorageEnum.State,
      partyDetails.addresses[0].state
    );
  }

  private _setLocalAddressCountry(
    partyDetails: PartyDetailsPayloadInterface
  ): void {
    localStorage.setItem(
      LocalStorageEnum.Country,
      partyDetails.addresses[0].country
    );
  }

  private _setLocalAddressFsaLocationId(
    partyDetails: PartyDetailsPayloadInterface
  ): void {
    localStorage.setItem(
      LocalStorageEnum.FasLocationId,
      partyDetails.addresses[0].fsa_location_id
    );
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
}
