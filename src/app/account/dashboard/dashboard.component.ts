import { Component, OnInit } from '@angular/core';
import { PartyService } from '../../core/party.service';
import { Subject } from 'rxjs';
import { LogoutService } from '../../core/logout.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public viewReady: boolean = false;
  private partyDetailsReadySubject: Subject<boolean> = new Subject<boolean>();

  constructor(
    private partyService: PartyService,
    private logoutService: LogoutService,
  ) { }

  ngOnInit() {
    this.partyDetailsReadySubject.subscribe(this.partyDetailsSubscriptionHandler.bind(this));
  }

  private partyDetailsSubscriptionHandler(response: boolean): void {
    if ( !response ) {
      console.log('ERROR: unable to process party details');
      this.logoutService.logout();
      return;
    }
    this.viewReady = true;
  }

}
