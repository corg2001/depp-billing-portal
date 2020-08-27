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
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private _authService: AuthenticationService,
    private _httpClient: HttpClient,
    private _loggerService: LoggerService
  ) { }

  public login(
    completionSubject: Subject<boolean>,
    dataSubject: Subject<any>,
    username: string,
    password: string
  ): void {
    this._httpClient
      .post(environment.loginUrl, {
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
    isComplete$: Subject<boolean>,
    response$: Subject<string>,
    userEmail: string,
    isUserFound$: Subject<boolean>,
  ): void {
    this._httpClient
      .post(environment.requestPasswordUrl, {
        username: userEmail
      })
      .subscribe(
        (response: { message: string }) =>
          this.requestPassWordSuccessHandler(response, response$, isUserFound$),
        (error: HttpErrorResponse) =>
          this.genericFailureHandler(null, error, isUserFound$, response$)
      );
  }

  public getTermsAndConditions(
    completionSubject: Subject<boolean>,
    dataSubject: Subject<any>
  ): void {
    // TODO: this uri needs to come from configuration
    this._httpClient.get(environment.termsAndConditionsUrl).subscribe(
      (response: Observable<HttpResponse<any>>) => {
        this.genericSuccessHandler(completionSubject, response, dataSubject);
      },
      (response: HttpErrorResponse) => {
        this.genericFailureHandler(completionSubject, response);
      }
    );
  }

  public getPrivacyPolicy(
    completionSubject: Subject<boolean>,
    dataSubject: Subject<any>
  ): void {
    // TODO: this uri needs to come from configuration
    this._httpClient.get(environment.privacyPolicyUrl).subscribe(
      (response: Observable<HttpResponse<any>>) => {
        this.genericSuccessHandler(completionSubject, response, dataSubject);
      },
      (error: HttpErrorResponse) => {
        this.genericFailureHandler(completionSubject, error);
      }
    );
  }

  private genericSuccessHandler(
    completion$: Subject<boolean>,
    response$: Observable<HttpResponse<any>>,
    dataSubject$?: Subject<any>,
    isUserFound$?: Subject<boolean>
  ): void {
    isUserFound$.next(true);
    if (dataSubject$) {
      dataSubject$.next(response$);
    }
    if (completion$) {
      completion$.next(true);
    }
  }

  private requestPassWordSuccessHandler(
    response: {message: string },
    dataSubject$?: Subject<any>,
    isUserFound$?: Subject<boolean>
  ): void {
    isUserFound$.next(true);
      dataSubject$.next(response.message);
  }

  private genericFailureHandler(
    completion$: Subject<boolean>,
    error: HttpErrorResponse,
    isUserFound$?: Subject<boolean>,
    response$?: Subject<any>,
  ): void {
    this.httpErrorHandler(error);
    if (completion$) {
      completion$.next(true);
    }
    isUserFound$.next(false);
    response$.next(error.error);
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
    this._httpClient
      .post(environment.resetPasswordUrl, { token, password })
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
