import { Component, OnInit } from '@angular/core';
import { PartyService } from '../../core/party.service';
import { Subject } from 'rxjs';
import { LogoutService } from '../../core/logout.service';
import { ConfigService } from '../../core/config.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public viewReady: boolean = false;
  private partyDetailsReadySubject$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private _partyService: PartyService,
    private _logoutService: LogoutService,
    private _configService: ConfigService,
  ) { }

  ngOnInit() {
    this.partyDetailsReadySubject$.subscribe(this.partyDetailsSubscriptionHandler.bind(this));
    this._configService.init();
    // console.log(this.configService.showConfig());
  }

  private partyDetailsSubscriptionHandler(response: boolean): void {
    if ( !response ) {
      console.log('ERROR: unable to process party details');
      this._logoutService.logout();
      return;
    }
    this.viewReady = true;
  }

}
