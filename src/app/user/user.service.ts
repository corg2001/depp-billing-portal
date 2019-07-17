import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  public login(): void {
    console.log('user service: login requested!');
  }

  public requestPassword(): void {
    console.log('service: new password requested!');

  }

  public resetPassword(): void {
    console.log('service: set new password requested!');
  }

}
