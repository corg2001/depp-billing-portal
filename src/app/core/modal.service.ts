import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

// Development artifacts

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private modalService: NgbModal) { }

  public openSimple(content: any): void {
    console.log('action: open simple modal from service');
    this.modalService.open(content);
  }
}
