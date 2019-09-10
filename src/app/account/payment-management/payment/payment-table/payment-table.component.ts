import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { PaymentHistoryInterface } from '../../interface/payment-history.interface';
import { ModalService } from 'src/app/core/modal.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-payment-table',
  templateUrl: './payment-table.component.html',
  styleUrls: ['./payment-table.component.scss']
})
export class PaymentTableComponent implements OnInit {
  @Input() public paymentHistory$: BehaviorSubject<PaymentHistoryInterface[]> = new BehaviorSubject([]);
  @Input() public updatedPaymentHistory$: BehaviorSubject<PaymentHistoryInterface[]> = new BehaviorSubject([]);
  @ViewChild('invoiceModal') public modalHtml: ElementRef;
  public paymentHistory: PaymentHistoryInterface[] = [];
  public page: number;
  public pageSize: number;
  public collectionSize: number = 0;
  public historiesFound: boolean;
  constructor(private _modalService: NgbModal) { }

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

  public viewInvoice(data): void {
    console.log(data);
    this._modalService.open(this.modalHtml, { centered: true});
  }

  public modifiedPaymentHistory(): PaymentHistoryInterface[] {
    return this.paymentHistory.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
}
