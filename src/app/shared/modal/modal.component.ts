import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() public windowTitle: string;

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  public close(): void {
    console.log('action: close modal');
    this.activeModal.close('Close Click');
  }

}
