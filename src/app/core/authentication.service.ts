import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient) {
  }

  public logout(): void {
    console.log('Action: user loggin out');
  }

  public isLoggedIn(): boolean {
    console.log('Action: checking for login session');
    return true;
  }

  private createSession(): void  {
    console.log('Action: Creating a new session');
  }

}
