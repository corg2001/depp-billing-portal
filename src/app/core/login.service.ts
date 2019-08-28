import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { LoggerService } from './logger.service';
import { LoginResponsePayload } from '../auth/login-response-payload';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient, private loggerService: LoggerService) { }


  public login(completion: Subject<boolean>, username: string, password: string): void {
    if (!username || !password) {
      this.loggerService.error('No user or password provided.');
      return;
    }
    const uri: string = '';
    const body: any =  {username, password};
    this.httpClient.post(uri, body).subscribe(
      (response: Observable<HttpResponse<LoginResponsePayload>>) => this.successHandler(completion, response),
      (response: Observable<HttpErrorResponse>) => this.errorHandler(completion, response)
    );
  }

  private successHandler(complete: Subject<boolean>, response: Observable<HttpResponse<any>>): void {}
  private errorHandler(complete: Subject<boolean>, response: Observable<HttpErrorResponse>): void {}
}
