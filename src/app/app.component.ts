import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './shared/modal/modal.component';
import { ConfigService } from './core/config.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { environment } from '../environments/environment';
declare var gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'testlab-application';

  public constructor(
    private modalService: NgbModal,
    private configService: ConfigService,
    private _router: Router,
    private _angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics
  ) {
    _angulartics2GoogleAnalytics.startTracking();
    const navEndEvents = _router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    );
    navEndEvents.subscribe((event: NavigationEnd) => {
      gtag('config', environment.analytics.google.brand.hwa, { page_path: event.urlAfterRedirects });
    });
  }

  public openModal(content: any): void {
    console.log('action: opening modal ...');
    this.modalService.open(content);
    this.configService.init();
  }
  public openModal2(): void {
    console.log('action: opening modal from component');
    this.modalService.open(ModalComponent);
  }
}
