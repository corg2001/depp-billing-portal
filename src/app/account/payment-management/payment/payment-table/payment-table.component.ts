import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { PaymentHistoryInterface } from '../../interface/payment-history.interface';
import { ModalService } from 'src/app/core/modal.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-payment-table',
  templateUrl: './payment-table.component.html',
  styleUrls: ['./payment-table.component.scss']
})
export class PaymentTableComponent implements OnInit {
  @Input() public paymentHistory: PaymentHistoryInterface[];
  @Input() public error: boolean;
  @Input() public completion: boolean;
  @ViewChild('invoiceModal') public modalHtml: ElementRef;

  public expandRow: boolean = false;
  constructor(private _modalService: NgbModal) { }

  ngOnInit() {
    
  }

  public viewInvoice(data): void {
    console.log(data)
    this._modalService.open(this.modalHtml, { centered: true});
  }
}
