import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  private completionSubject: Subject<boolean> = new Subject<boolean>();

  constructor(private authService: AuthenticationService, private router: Router) {
    this.completionSubject.subscribe(this.subscriptionHandler.bind(this));
  }

  public logout(): void {
    this.authService.logout(this.completionSubject);
  }

  private subscriptionHandler(response: boolean): void {
    if (!response) {
      console.log('ERROR: unable to logout ....');
      return;
    }
    console.log('you have been logout');
    this.router.navigate(['user/login']);
  }
}
