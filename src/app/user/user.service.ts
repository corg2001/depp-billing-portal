import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { AuthenticationService } from '../core/authentication.service';
import { LoginResponsePayload } from './login-response-payload';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient: HttpClient,
    private authService: AuthenticationService
  ) { }

  public login(completionSubject: Subject<boolean>, username: string, password: string): void {
    const URI: string = 'https://unify-hwa-contractor-api-dev.engine.host/authentication/passport/login';
    this.httpClient.post(URI, {
      username,
      password,
    }).subscribe(
      (response: Observable<HttpResponse<LoginResponsePayload>>) => this.loginSuccessHandler(completionSubject, response),
      (response: Observable<HttpErrorResponse>) => this.loginFailureHandler(completionSubject, response)
    );
  }

  public requestPassword(completionSubject: Subject<boolean>, userEmail: string): void {
    console.log('service: new password requested!');
    const URI: string = 'https://unify-hwa-contractor-api-dev.engine.host/authentication/passport/forgot-password';
    this.httpClient.post(URI, {
      username: userEmail
    }).subscribe(
      (response: Observable<HttpResponse<any>>) => this.genericSuccessHandler(completionSubject, response),
      (response: Observable<HttpErrorResponse>) => this.genericFailureHandler(completionSubject, response)
    );
  }

  public getTermsAndConditions(completionSubject: Subject<boolean>, dataSubject: Subject<any>): void {
    // TODO: this uri needs to come from configuration
    const uri: string = 'https://unify-hwa-contractor-api-dev.engine.host/services/legal-terms/terms-of-use';
    this.httpClient.get(uri).subscribe(
      (response: Observable<HttpResponse<any>>) => { this.genericSuccessHandler(completionSubject, response, dataSubject); },
      (response: Observable<HttpErrorResponse>) => { this.genericFailureHandler(completionSubject, response); }
    );
  }

  public getPrivacyPolicy(completionSubject: Subject<boolean>, dataSubject: Subject<any>): void {
    // TODO: this uri needs to come from configuration
    const uri: string = 'https://unify-hwa-contractor-api-dev.engine.host/services/legal-terms/privacy-policy';
    this.httpClient.get(uri).subscribe(
      (response: Observable<HttpResponse<any>>) => { this.genericSuccessHandler(completionSubject, response, dataSubject); },
      (response: Observable<HttpErrorResponse>) => { this.genericFailureHandler(completionSubject, response); }
    );
  }

  private genericSuccessHandler(
    completionSubject: Subject<boolean>,
    response: Observable<HttpResponse<any>>,
    dataSubject?: Subject<any>
  ): void {
    if ( dataSubject ) {
      dataSubject.next(response);
    }
    completionSubject.next(true);
  }

  private genericFailureHandler(completionSubject: Subject<boolean>, error: Observable<HttpErrorResponse>): void {
    this.httpErrorHandler(error);
    completionSubject.next(false);
  }

  private loginSuccessHandler(completionSubject: Subject<boolean>, response: Observable<HttpResponse<LoginResponsePayload>>): void {
    this.authService.createSession(response);
    completionSubject.next(true);
  }

  private loginFailureHandler(completionSubject: Subject<boolean>, response: Observable<HttpErrorResponse>): void {
    this.httpErrorHandler(response);
    completionSubject.next(false);
  }

  private httpErrorHandler(error: any): any {
    console.log('Action: Handling http error');
    console.log(error);
  }

  public resetPassword(): void {
    console.log('service: set new password requested!');
  }
}

