// tslint:disable:no-inferrable-types
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  public login(completionSubject: Subject<boolean>, username: string, password: string): void {
    const URI: string = 'http://localhost:3000/login';
    this.httpClient.post(URI, {
      userName: username,
      userPass: password,
    }).subscribe(
      (response: Observable<HttpResponse<any>>) => this.loginSuccessHandler(completionSubject, response),
      (response: Observable<HttpErrorResponse>) => this.loginFailureHandler(completionSubject, response)
    );
  }

  public requestPassword(completionSubject: Subject<boolean>, userEmail: string): void {
    console.log('service: new password requested!');
    const URI: string = 'http://localhost:3000/forgot';
    this.httpClient.post(URI, {
      userEmail
    }).subscribe(
      (response: Observable<HttpResponse<any>>) => this.forgotPasswordSuccessHandler(completionSubject, response),
      (response: Observable<HttpErrorResponse>) => this.forgotPasswordFailureHandler(completionSubject, response)
    );
  }

  private loginSuccessHandler(completionSubject: Subject<boolean>, response: Observable<HttpResponse<any>>): void {
    // TODO: make request to authentication service to create the session
    completionSubject.next(true);
  }

  private loginFailureHandler(completionSubject: Subject<boolean>, response: Observable<HttpErrorResponse>): void {
    this.httpErrorHandler(response);
    completionSubject.next(false);
  }

  private forgotPasswordSuccessHandler(completionSubject: Subject<boolean>, response: Observable<HttpResponse<any>>): void {
    completionSubject.next(true);
    // TODO: handle response;
  }

  private forgotPasswordFailureHandler(completionSubject: Subject<boolean>, error: Observable<HttpErrorResponse>): void {
    this.httpErrorHandler(error);
    completionSubject.next(false);
  }


  public getTermsAndConditions(completionSubject: Subject<boolean>, dataSubject: Subject<any>): void {
    // TODO: this uri needs to come from configuration
    const uri: string = 'https://unify-hwa-api-dev.engine.host/services/legal-terms/terms-of-use';
    this.httpClient.get(uri).subscribe(
      (response: Observable<HttpResponse<any>>) => { this.getTermsAndConditionsSuccessHandler(completionSubject, dataSubject, response); },
      (response: Observable<HttpErrorResponse>) => { this.getTermsAndConditionsFailureHandler(completionSubject, response); }
      );
  }

  private getTermsAndConditionsSuccessHandler(
    completionSubject: Subject<boolean>,
    dataSubject: Subject<any>,
    response: Observable<HttpResponse<any>>
  ): void {
    dataSubject.next(response);
    completionSubject.next(true);
  }

  private getTermsAndConditionsFailureHandler(completionSubject: Subject<any>, error: Observable<HttpErrorResponse>): void {
    this.httpErrorHandler(error);
    completionSubject.next(false);
  }


  public resetPassword(): void {
    console.log('service: set new password requested!');
  }

  private httpErrorHandler(error: any): any {
    console.log('Action: Handling http error');
    console.log(error);
  }

}
