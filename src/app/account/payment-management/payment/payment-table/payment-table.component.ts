import { Component, OnInit, Input } from '@angular/core';
import { PaymentHistoryInterface } from '../../interface/payment-history.interface';

@Component({
  selector: 'app-payment-table',
  templateUrl: './payment-table.component.html',
  styleUrls: ['./payment-table.component.scss']
})
export class PaymentTableComponent implements OnInit {
  @Input() public paymentHistory: PaymentHistoryInterface[];
  @Input() public error: boolean;
  @Input() public completion: boolean;

  public expandRow: boolean = false;
  constructor() { }

  ngOnInit() {
  }

  public viewInvoice(): void {
    this.expandRow = !this.expandRow;
  }
}
