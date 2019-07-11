import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'testlab-application';

  public constructor(private modalService: NgbModal) {}


  public openModal(content: any): void {
    console.log('action: opening modal ...');
    this.modalService.open(content);
  }

}
