import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { AuthenticationService } from '../core/authentication.service';
import { LoginResponsePayload } from './login-response-payload';
import { LoggerService } from '../core/logger.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private _authService: AuthenticationService,
    private _httpClient: HttpClient,
    private _loggerService: LoggerService
  ) {}

  public login(
    completionSubject: Subject<boolean>,
    dataSubject: Subject<any>,
    username: string,
    password: string
  ): void {
    const URI: string =
      'https://unify-hwa-contractor-api-qa11.engine.host/authentication/passport/login';
    this._httpClient
      .post(URI, {
        username,
        password
      })
      .subscribe(
        (response: Observable<HttpResponse<LoginResponsePayload>>) =>
          this.loginSuccessHandler(completionSubject, dataSubject, response),
        (response: Observable<HttpErrorResponse>) =>
          this.loginFailureHandler(completionSubject, dataSubject, response)
      );
  }

  public requestPassword(
    completionSubject: Subject<boolean>,
    userEmail: string
  ): void {
    console.log('service: new password requested!');
    const URI: string =
      'https://unify-hwa-contractor-api-qa11.engine.host/authentication/passport/forgot-password';
    this._httpClient
      .post(URI, {
        username: userEmail
      })
      .subscribe(
        (response: Observable<HttpResponse<any>>) =>
          this.genericSuccessHandler(completionSubject, response),
        (response: Observable<HttpErrorResponse>) =>
          this.genericFailureHandler(completionSubject, response)
      );
  }

  public getTermsAndConditions(
    completionSubject: Subject<boolean>,
    dataSubject: Subject<any>
  ): void {
    // TODO: this uri needs to come from configuration
    const uri: string =
      'https://unify-hwa-contractor-api-qa11.engine.host/services/legal-terms/terms-of-use';
    this._httpClient.get(uri).subscribe(
      (response: Observable<HttpResponse<any>>) => {
        this.genericSuccessHandler(completionSubject, response, dataSubject);
      },
      (response: Observable<HttpErrorResponse>) => {
        this.genericFailureHandler(completionSubject, response);
      }
    );
  }

  public getPrivacyPolicy(
    completionSubject: Subject<boolean>,
    dataSubject: Subject<any>
  ): void {
    // TODO: this uri needs to come from configuration
    const uri: string =
      'https://unify-hwa-contractor-api-qa11.engine.host/services/legal-terms/privacy-policy';
    this._httpClient.get(uri).subscribe(
      (response: Observable<HttpResponse<any>>) => {
        this.genericSuccessHandler(completionSubject, response, dataSubject);
      },
      (response: Observable<HttpErrorResponse>) => {
        this.genericFailureHandler(completionSubject, response);
      }
    );
  }

  private genericSuccessHandler(
    completionSubject: Subject<boolean>,
    response: Observable<HttpResponse<any>>,
    dataSubject?: Subject<any>
  ): void {
    if (dataSubject) {
      dataSubject.next(response);
    }
    completionSubject.next(true);
  }

  private genericFailureHandler(
    completionSubject: Subject<boolean>,
    error: Observable<HttpErrorResponse>
  ): void {
    this.httpErrorHandler(error);
    completionSubject.next(false);
  }

  private loginSuccessHandler(
    completionSubject: Subject<boolean>,
    dataSubject: Subject<any>,
    response: Observable<HttpResponse<LoginResponsePayload>>
  ): void {
    if (!this._authService.newSession(response)) {
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
    response: Observable<HttpErrorResponse>
  ): void {
    this.httpErrorHandler(response);
    dataSubject.next(response);
    completionSubject.next(false);
  }

  private httpErrorHandler(response: any): any {
    this._loggerService.action('HTTP Error handler');
    this._loggerService.error(response.error.message);
  }

  public resetPassword(
    token: string,
    password: string,
    success$: Subject<boolean>,
    response$?: Subject<any>
  ): void {
    const uri: string =
      'https://unify-hwa-contractor-api-qa11.engine.host/authentication/passport/reset-password';
    this._httpClient
      .post(uri, { token, password })
      .subscribe(
        (response: Observable<HttpResponse<any>>) =>
          this._resetPasswordSuccessHandler(success$, response, response$),
        (error: Observable<HttpErrorResponse>) =>
          this._resetPasswordErrorHandler(success$, error, response$)
      );
  }

  private _resetPasswordSuccessHandler(
    success$: Subject<boolean>,
    response: Observable<HttpResponse<any>>,
    response$?: Subject<any>
  ) {
    success$.next(true);
    response$.next(response);
  }

  private _resetPasswordErrorHandler(
    success$: Subject<boolean>,
    error: Observable<HttpErrorResponse>,
    response$?: Subject<any>
  ) {
    success$.next(false);
    response$.next(error);
  }
}
