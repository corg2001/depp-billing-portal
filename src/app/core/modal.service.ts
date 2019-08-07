import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

// Development artifacts
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private modalService: NgbModal, private loggerService: LoggerService) { }

  public openSimple(content: any): void {
    this.loggerService.action('Simple Modal opening ...');
    this.modalService.open(content);
  }
}
