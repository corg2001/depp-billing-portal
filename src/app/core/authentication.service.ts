import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { LoginResponsePayload } from '../user/login-response-payload';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private session: any;

  constructor(private httpClient: HttpClient) {
  }

  public logout(): void {
    console.log('Action: user loggin out');
  }

  public createSession(data: any): void  {
    console.log('Action: Creating a new session');
    this.session = data;
  }

  public isLoggedIn(): boolean {
    return !!this.session;
  }



}
