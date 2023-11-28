import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {NavigationStart, Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import {MaintenanceService} from './maintenance.service';

@Injectable()
/**
 * MaintenanceInterceptor
 */
export class MaintenanceInterceptor implements HttpInterceptor {
  private previousUrl: string;
  public constructor(private _maintenance: MaintenanceService, private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.previousUrl = this.router.url;
      }
    });
  }

  // tslint:disable:no-any
  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    const currentUrl: string = this.router.url;
    if (req.url.endsWith('/config_v4.json') && this._maintenance.isLoading()) {      
      return next.handle(req);
    }
    
    if (currentUrl !== this.previousUrl) {
      const brand = environment.core.brandId.toLowerCase();      
      this._maintenance.checkMaintenance().then((value: boolean) => {
        if (value) {
          window.location.href = `/assets/maintenance-page/${brand}/maintenance-page.html`;
        }
      });
    }

    this.previousUrl = currentUrl;

    return next.handle(req);
  }
}
