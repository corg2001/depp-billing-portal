import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './shared/modal/modal.component';
import { ConfigService } from './core/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'testlab-application';

  public constructor(private modalService: NgbModal, private configService: ConfigService) {}


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
