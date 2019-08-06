import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

// TODO: move it into it's own file
enum SessionKeys {
  token = 'token',
  last_login = 'last_login'
}


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() {
    const date: Date =  new Date();
    console.log(`IMPORTANT: authentication service loaded ... ${date}`);
  }

  public logout(completionSubject: Subject<boolean>): void {
    localStorage.clear();
    !localStorage.getItem(SessionKeys.token) ? completionSubject.next(true) : completionSubject.next(false);
  }

  public newSession(data: any): boolean  {
    const token: string = data.token ? data.token.trim() : '';
    const lastLogin: string = data.last_login ? data.last_login.trim() : '';
    if (!token && !lastLogin) {
      return false;
    }
    return this.createSession(token, lastLogin);
  }

  public isLoggedIn(): boolean {
    return !!localStorage.getItem(SessionKeys.token);
  }

  public getToken(): string {
    // if ( !this.isLoggedIn() ) {
    //   console.log('Error: unable to get token');
    //   return;
    // }
    return localStorage.getItem(SessionKeys.token) ? localStorage.getItem(SessionKeys.token) : '';
  }

  private createSession(token: string, lastLogin: string): boolean {
    localStorage.setItem(SessionKeys.token, token);
    localStorage.setItem(SessionKeys.last_login, lastLogin);
    return localStorage.getItem(SessionKeys.token) ? true : false;
  }

}
