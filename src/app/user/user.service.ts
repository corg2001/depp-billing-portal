import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { AuthenticationService } from '../core/authentication.service';
import { LoginResponsePayload } from './login-response-payload';
import { LoggerService } from '../core/logger.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

constructor(
    private authService: AuthenticationService,
    private httpClient: HttpClient,
    private loggerService: LoggerService
  ) { }

  public login(completionSubject: Subject<boolean>, dataSubject: Subject<any>, username: string, password: string): void {
    const URI: string = 'https://unify-hwa-contractor-api-qa11.engine.host/authentication/passport/login';
    this.httpClient.post(URI, {
      username,
      password,
    }).subscribe(
      (response: Observable<HttpResponse<LoginResponsePayload>>) => this.loginSuccessHandler(completionSubject, dataSubject,  response),
      (response: Observable<HttpErrorResponse>) => this.loginFailureHandler(completionSubject, dataSubject, response)
    );
  }

  public requestPassword(completionSubject: Subject<boolean>, userEmail: string): void {
    console.log('service: new password requested!');
    const URI: string = 'https://unify-hwa-contractor-api-qa11.engine.host/authentication/passport/forgot-password';
    this.httpClient.post(URI, {
      username: userEmail
    }).subscribe(
      (response: Observable<HttpResponse<any>>) => this.genericSuccessHandler(completionSubject, response),
      (response: Observable<HttpErrorResponse>) => this.genericFailureHandler(completionSubject, response)
    );
  }

  public getTermsAndConditions(completionSubject: Subject<boolean>, dataSubject: Subject<any>): void {
    // TODO: this uri needs to come from configuration
    const uri: string = 'https://unify-hwa-contractor-api-qa11.engine.host/services/legal-terms/terms-of-use';
    this.httpClient.get(uri).subscribe(
      (response: Observable<HttpResponse<any>>) => { this.genericSuccessHandler(completionSubject, response, dataSubject); },
      (response: Observable<HttpErrorResponse>) => { this.genericFailureHandler(completionSubject, response); }
    );
  }

  public getPrivacyPolicy(completionSubject: Subject<boolean>, dataSubject: Subject<any>): void {
    // TODO: this uri needs to come from configuration
    const uri: string = 'https://unify-hwa-contractor-api-qa11.engine.host/services/legal-terms/privacy-policy';
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

  private loginSuccessHandler(
    completionSubject: Subject<boolean>,
    dataSubject: Subject<any>,
    response: Observable<HttpResponse<LoginResponsePayload>>
  ): void {
 
    if ( !this.authService.newSession(response) ) {
      // TODO: do a better management of errors
      this.httpErrorHandler('InternalError: Unable to create session ...');
      dataSubject.next(response);
      completionSubject.next(false);
    }
    completionSubject.next(true);
  }

  private loginFailureHandler(
    completionSubject: Subject<boolean>,
    dataSubject: Subject<any>,
    response: Observable<HttpErrorResponse>): void {
    this.httpErrorHandler(response);
    dataSubject.next(response);
    completionSubject.next(false);
  }

  private httpErrorHandler(response: any): any {
    this.loggerService.action('HTTP Error handler');
    this.loggerService.error(response.error.message);
  }

  public resetPassword(): void {
    console.log('service: set new password requested!');
  }
}
