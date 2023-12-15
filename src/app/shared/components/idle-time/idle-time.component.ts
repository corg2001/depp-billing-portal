import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ConfigService } from "src/app/core/config.service";
import { LogoutService } from "src/app/core/logout.service";

@Component({
  selector: 'app-idle-time',
  templateUrl: './idle-time.component.html',
  styleUrls: ['./idle-time.component.scss']
})
export class IdleTimeComponent implements OnInit {
  constructor(private _activeModalService: NgbActiveModal, private logoutService: LogoutService, private _configService: ConfigService) { }

  ngOnInit() { }

  public resetIdleTime(): void {
    this._activeModalService.close(null);
    this._configService.resetIdleTime$.next(true);
  }

  public logout(): void {
    this.logoutService.logout();
    this._activeModalService.close();
  }
}
