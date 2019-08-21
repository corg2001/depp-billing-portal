import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-table',
  templateUrl: './payment-table.component.html',
  styleUrls: ['./payment-table.component.scss']
})
export class PaymentTableComponent implements OnInit {
  public expandRow: boolean = false;
  constructor() { }

  ngOnInit() {
  }

  public viewInvoice(): void {
    this.expandRow = !this.expandRow;
  }
}
