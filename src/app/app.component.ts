import { Component, OnInit, Renderer2, Inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './shared/modal/modal.component';
import { ConfigService } from './core/config.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { environment } from '../environments/environment';
import {MaintenanceService} from './core/maintenance.service';
declare var gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'testlab-application';

  public constructor(
    private modalService: NgbModal,
    private configService: ConfigService,
    private _maintenance: MaintenanceService,
    private _router: Router,
    private _renderer: Renderer2
  ) {
    _router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      gtag('config', environment.analytics.google.brand.hwa, { page_path: event.urlAfterRedirects });
    });
  }

  ngOnInit() {
    const brand = environment.core.brandId.toLowerCase();
    this._maintenance.checkMaintenance().then((value: boolean) => {
      if (value) {
        window.location.href = `/assets/maintenance-page/${brand}/maintenance-page.html`;
      }
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
