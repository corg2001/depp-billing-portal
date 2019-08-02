import { Component, OnInit } from '@angular/core';
import { LogoutService } from '../../core/logout.service';

@Component({
  selector: 'app-private-layout',
  templateUrl: './private-layout.component.html',
  styleUrls: ['./private-layout.component.scss']
})
export class PrivateLayoutComponent implements OnInit {

  constructor(private logoutService: LogoutService) { }

  ngOnInit() {
  }

  public logout(): void {
    this.logoutService.logout();
  }

}
