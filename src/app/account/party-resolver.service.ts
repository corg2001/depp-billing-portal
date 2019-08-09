import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

// Development artifacts
import { PartyService } from '../core/party.service';
import { ConfigService } from '../core/config.service';
import { LogoutService } from '../core/logout.service';
import { LoggerService } from '../core/logger.service';

@Injectable({
  providedIn: 'root'
})

export class PartyResolverService implements Resolve<any> {

  constructor(
    private configService: ConfigService,
    private logoutService: LogoutService,
    private loggerService: LoggerService,
    private partyService: PartyService,
  ) {}

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.partyService.init();
  }
}
