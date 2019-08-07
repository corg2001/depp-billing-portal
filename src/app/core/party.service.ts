import { Injectable } from '@angular/core';
import { Observable, Subject, Subscriber } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';

// development artifacts
import { AuthenticationService } from './authentication.service';
import { LoggerService } from './logger.service';
import { LogoutService } from './logout.service';
import { PartyDetailsPayload } from '../account/interface/party-details.payload';


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
    private logoutService: LogoutService,
  ) {}

  public init(): Observable<boolean> {
    return new Observable(observer => {
      this.getPartyDetails(observer);
    });
  }

  private getPartyDetails(subscription: Subscriber<boolean>): any {
    const uri: string = 'https://unify-hwa-contractor-api-dev.engine.host/services/party';
    this.httpClient.get(uri).subscribe(
      (responseData: Observable<HttpResponse<PartyDetailsPayload>>) => { this.getPartyDetailsSuccessHandler(subscription, responseData); },
      (responseError: Observable<HttpErrorResponse>) => { this.getPartyDetailsFailureHandler(subscription, responseError); }
      );
  }

  private getPartyDetailsSuccessHandler(
    subscription: Subscriber<boolean>,
    responseData: Observable<HttpResponse<PartyDetailsPayload>>
  ): void {
    this.loggerService.action(' Party details successfully obtained ...');
    // subscription.next(true);
    subscription.complete();
  }

  private getPartyDetailsFailureHandler(subscription: Subscriber<boolean>, responseError: any): void {
    this.loggerService.error('Unable to retrieve party details');
    // subscription.next(false);
    subscription.complete();
    this.logoutService.logout();
  }

  public lackOfBetterName(partyPayload: any): boolean {
    this.addressHandler(partyPayload.address);
    this.companyInfoHandler();
    return true;
  }

  private addressHandler(addressFromPayload: any[]): void {
    const addressList: Address[] = [];
    for (const address of addressFromPayload) {
      addressList.push(this.addressFactory(
        address.addres1,
        address.addres2,
        address.zip_code,
        address.city,
        address.state,
        address.country
      ));
    }
    this.address = addressList;
  }

  private addressFactory(
    address1: string,
    address2: string,
    zipCode: string,
    city: string,
    state: string,
    country: string
  ): Address {
    return {
      address1: address1.trim(),
      address2: address2.trim(),
      zipCode: zipCode.trim(),
      city: city.trim(),
      state: state.trim(),
      country: country.trim(),
    };
  }
  private companyInfoHandler(): void {}
}
