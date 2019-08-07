import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

// Development artifacts
import { PartyService } from '../core/party.service';

@Injectable({
  providedIn: 'root'
})

export class PartyResolverService implements Resolve<any> {

  constructor(private partyService: PartyService) {}

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.partyService.init();
  }
}
