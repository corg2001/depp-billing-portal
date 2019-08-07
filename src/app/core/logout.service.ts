import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  private completionSubject: Subject<boolean> = new Subject<boolean>();

  constructor(
    private authService: AuthenticationService,
    private loggerService: LoggerService,
    private router: Router
  ) {
    this.completionSubject.subscribe(this.subscriptionHandler.bind(this));
  }

  public logout(): void {
    this.authService.logout(this.completionSubject);
  }

  private subscriptionHandler(response: boolean): void {
    if (!response) {
      this.loggerService.error('Unable to logout');
      return;
    }
    this.loggerService.log('You have been logged out, good bye.');
    this.router.navigate(['user/login']);
  }
}
