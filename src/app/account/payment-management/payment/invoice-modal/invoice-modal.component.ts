import { Component, OnInit, AfterViewInit } from '@angular/core';
import { PaymentAbstractService } from '../../service/abstract/payment.abstract.service';
import { PaymentHistoryInterface } from '../../interface/payment-history.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  standalone: false,
  selector: 'app-invoice-modal',
  templateUrl: './invoice-modal.component.html',
  styleUrls: ['./invoice-modal.component.scss']
})
export class InvoiceModalComponent implements OnInit {
  public paymentHistory: PaymentHistoryInterface;

  constructor(private _paymentService: PaymentAbstractService, private _modalService: NgbModal) {}

  ngOnInit() {
    this.paymentHistory = this._paymentService.paymentHistory;
  }

  public close(): void {
    this._modalService.dismissAll();
  }
}
