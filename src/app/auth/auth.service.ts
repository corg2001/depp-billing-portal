import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AuthenticationService } from '../core/authentication.service';
import { LoginResponsePayload } from './login-response-payload';
import { LoggerService } from '../core/logger.service';
import { environment } from 'src/environments/environment';
import { IAuthorizedUser } from '../shared/models/interface/authorized-user.interface';
import { ICognitoLoginResponse } from '../shared/models/interface/cognito.interface';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private _authService: AuthenticationService,
    private _httpClient: HttpClient,
    private _loggerService: LoggerService
  ) { }



  public requestPassword(
    response$: Subject<string>,
    userEmail: string,
    isUserFound$: Subject<boolean>,
  ): void {
    this._httpClient
      .post(environment.requestPasswordUrl, {
        username: userEmail,
        brand: "DEPPB"
      })
      .subscribe(
        (response: { message: string }) =>
          this.requestPassWordSuccessHandler(response$, isUserFound$),
        (error: HttpErrorResponse) =>
          this.requestPassWordErrorHandler(response$, isUserFound$)
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
    response$?: Subject<string>,
    isUserFound$?: Subject<boolean>
  ): void {
    sessionStorage.removeItem('compromised-login');
    isUserFound$.next(true);
    response$.next(environment.auth.forgotPassword.success);
  }

  private requestPassWordErrorHandler(
    response$?: Subject<any>,
    isUserFound$?: Subject<boolean>
  ): void {
    isUserFound$.next(false);
    response$.next(environment.auth.forgotPassword.success);
  }

  private genericFailureHandler(
    completion$: Subject<boolean>,
    error: HttpErrorResponse,
    response$?: Subject<any>,
  ): void {
    this.httpErrorHandler(error);
    if (completion$) {
      completion$.next(true);
    }
    response$.next(error.error);
  }

  public loginSuccessHandler(
    completionSubject: Subject<boolean>,
    dataSubject: Subject<any>,
    response: ICognitoLoginResponse
  ): void {
    if (!this._authService.newSession(response)) {
      // TODO: do a better management of errors
      this.httpErrorHandler('InternalError: Unable to create session ...');
      dataSubject.next(response);
      completionSubject.next(false);
      this._authService.isLoggedIn$.next(false);
    }
    completionSubject.next(true);
    this._authService.isLoggedIn$.next(true);
  }

  private loginFailureHandler(
    completionSubject: Subject<boolean>,
    dataSubject: Subject<any>,
    response: Observable<HttpErrorResponse>
  ): void {
    this.httpErrorHandler(response);
    dataSubject.next(response);
    completionSubject.next(false);
    this._authService.isLoggedIn$.next(false);
  }

  private httpErrorHandler(response: any): any {
    this._loggerService.action('HTTP Error handler');
    this._loggerService.error(response.error.message);
  }

  public resetPassword(
    token: string,
    username: string,
    password: string,
    success$: Subject<boolean>,
    response$?: Subject<any>
  ): void {
    this._httpClient
      .post(environment.resetPasswordUrl, { token, username, password, brand: "DEPPB" })
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

  private _authUser: IAuthorizedUser = {
    AuthenticationResult: {
      AccessToken: '',
      ExpiresIn: 0,
      IdToken: '',
      RefreshToken: '',
      TokenType: ''
    },
    ChallengeParameters: {}
  }
  private _authUser$: BehaviorSubject<IAuthorizedUser> = new BehaviorSubject<
    IAuthorizedUser
  >(this._authUser);

  public getUser$(): BehaviorSubject<IAuthorizedUser> {
    return this._authUser$;
  }

  public setUser(user: IAuthorizedUser): void {
    this._authUser$.next(user);
  }
}
