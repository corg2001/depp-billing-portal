import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { PaymentHistoryInterface } from '../../interface/payment-history.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs';
import { PaymentAbstractService } from '../../service/abstract/payment.abstract.service';
import { InvoiceModalComponent } from '../invoice-modal/invoice-modal.component';

@Component({
  selector: 'app-payment-table',
  templateUrl: './payment-table.component.html',
  styleUrls: ['./payment-table.component.scss']
})
export class PaymentTableComponent implements OnInit {
  @Input() public paymentHistory$: BehaviorSubject<PaymentHistoryInterface[]> = new BehaviorSubject([]);
  @Input() public updatedPaymentHistory$: BehaviorSubject<PaymentHistoryInterface[]> = new BehaviorSubject([]);
  @ViewChild('invoiceModal', { static: false }) public modalHtml: ElementRef;
  public paymentHistory: PaymentHistoryInterface[] = [];
  public page: number;
  public pageSize: number;
  public collectionSize: number = 0;
  public historiesFound: boolean;
  constructor(private _modalService: NgbModal, private _paymentService: PaymentAbstractService) { }

  ngOnInit() {
    this.updatedPaymentHistory$.subscribe((updatedPaymentHistory) => {
      this.paymentHistory = updatedPaymentHistory;
    });
    this.paymentHistory$.subscribe((paymenHistory: PaymentHistoryInterface[]) => {
      this.paymentHistory = paymenHistory;
      this.collectionSize = paymenHistory.length;
      paymenHistory.length > 0 ? this.historiesFound = true : this.historiesFound = false;
    });
    this.page = 1;
    this.pageSize = 15;

  

  }

  public viewInvoice(data: PaymentHistoryInterface): void {
    this._paymentService.setInvoicDetails(data);
    this._modalService.open(InvoiceModalComponent);
  }

  public modifiedPaymentHistory(): PaymentHistoryInterface[] {
    return this.paymentHistory.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
}
