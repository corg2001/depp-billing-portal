import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LoggerService } from '../../core/logger.service';

@Component({
  standalone: false,
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() public windowTitle: string;

  constructor(private activeModal: NgbActiveModal, private loggerService: LoggerService) { }

  ngOnInit() {
  }

  public close(): void {
    this.loggerService.action('Simple modal windows is closing ...');
    this.activeModal.close('Close Click');
  }

}
