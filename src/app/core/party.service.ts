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
import { PartyDetailsPayload } from '../account/interface/party-details.payload';
import { environment } from 'src/environments/environment';

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
      (responseData: Observable<HttpResponse<PartyDetailsPayload>>) => {
        this.getPartyDetailsSuccessHandler(subscription, responseData);
      },
      (responseError: Observable<HttpErrorResponse>) => {
        this.getPartyDetailsFailureHandler(subscription, responseError);
      }
    );
  }

  private getPartyDetailsSuccessHandler(
    subscription: Subscriber<boolean>,
    responseData: Observable<HttpResponse<PartyDetailsPayload>>
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
    data: Observable<HttpResponse<PartyDetailsPayload>>
  ): void {
    const associations: any = data['associations']['_association'][0];
    localStorage.setItem(
      'partyId',
      associations['account_information']['account_id']
    );
    if (data['party_name_details']['person_name'] !== null) {
      localStorage.setItem(
        'partyName',
        `${data['party_name_details']['person_name']['last_name']}
      ${data['party_name_details']['person_name']['first_name']}`
      );
    }
    if (!this.validateLocalStorage()) {
      this.loggerService.error('Unable to get partyId from payload');
    }
    subscription.next(true);
    subscription.complete();
  }

  private validateLocalStorage(): boolean {
    return localStorage.getItem('partyId') ? true : false;
  }


}
