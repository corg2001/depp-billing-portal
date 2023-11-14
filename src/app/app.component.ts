import { AuthenticationService } from './core/authentication.service';
import { Component, Renderer2, Inject } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ConfigService } from './core/config.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { IdleTimeComponent } from './shared/components/idle-time/idle-time.component';
declare var gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'testlab-application';
  public idleSession: any;

  public constructor(
    private modalService: NgbModal,
    private _configService: ConfigService,
    private _authenticationService: AuthenticationService,
    private _router: Router,
  ) {
    this._router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      gtag('config', environment.analytics.google.brand.hwa, { page_path: event.urlAfterRedirects });
    });

    if (this._authenticationService.isLoggedIn$.getValue() || this._authenticationService.isLoggedIn()) {
      this.idleSession = this._createIdleSession();
    }

    this._authenticationService.isLoggedIn$.subscribe((isLoggedIn: boolean) => {
      if (isLoggedIn) {
        this.idleSession = this._createIdleSession();
      }

    })

    this._configService.resetIdleTime$.subscribe((shouldReset: boolean) => {
      if (shouldReset) {
        clearTimeout(this.idleSession);
        this.idleSession = this._createIdleSession();
      }
    });
  }

  private _createIdleSession(): any {
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false
    };
    return setTimeout(() => {
      this.modalService.open(IdleTimeComponent, ngbModalOptions);
    }, environment.core.idleTimeout.timeoutSeconds * 1000)
  }
}
