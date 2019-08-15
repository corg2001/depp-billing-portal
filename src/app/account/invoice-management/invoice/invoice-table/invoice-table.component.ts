import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { InvoiceService } from 'src/app/account/invoice-management/invoice.service';
import { Invoice } from '../../model/invoice.model';

@Component({
  selector: 'app-invoice-table',
  templateUrl: './invoice-table.component.html',
  styleUrls: ['./invoice-table.component.scss']
})

export class InvoiceTableComponent implements OnInit {
  public invoice: Invoice[] = [];
  public page: number;
  public pageSize: number;
  public collectionSize: number = 0;
  public pageList: number[] = [2, 4, 6, 8];

  public invoiceListSubject: Subject<any> = new Subject();
  public completionSubject: Subject<boolean> = new Subject();
  public loading: boolean = true;

  constructor(private _invoiceService: InvoiceService) { }

  ngOnInit() {
    this.invoiceListSubject.subscribe((invoiceData: Invoice[]) => {
      this.invoice = invoiceData.slice(0, 100); // TODO: remove the slice and fix the pagination bar
      this.collectionSize = this.invoice.length;
      this.loading = false;
    });
    this._invoiceService.invoice$.subscribe(invoiceData => this.invoice = invoiceData);
    this.loading = true;
    this._invoiceService.getInvoice(this.completionSubject, this.invoiceListSubject);
    this.page = 1;
    this.pageSize = 15;
    this.collectionSize = 10;
  }

  public modifiedInvoice(): Invoice[] {
    return this.invoice.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
}
