import { Component, OnInit, Input } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { InvoiceService } from 'src/app/account/invoice-management/service/invoice.service';
import { Invoice } from '../../model/invoice.model';
import { InvoiceInterface } from '../../interface/invoice.interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-invoice-table',
  templateUrl: './invoice-table.component.html',
  styleUrls: ['./invoice-table.component.scss']
})

export class InvoiceTableComponent implements OnInit{
  @Input() public invoices$: BehaviorSubject<InvoiceInterface[]> = new BehaviorSubject([]);
  @Input() public error: boolean;
  @Input() public completion: boolean;
  public noInfoText: string;
  public infoFound: boolean;
  public invoices: InvoiceInterface[] = [];
  public page: number;
  public pageSize: number;
  public collectionSize: number = 0;
  public pageList: number[] = [2, 4, 6, 8];

  // public invoiceListSubject: Subject<any> = new Subject();
  // public completionSubject: Subject<boolean> = new Subject();
  // public loading: boolean = true;

  constructor() { }
 
  ngOnInit(): void {
    this.noInfoText = `Please contact Contractor Relations at ${environment.core.customerServiceNumber}for assistance.`;
    this.invoices$.subscribe((invoices: InvoiceInterface[]) => {
      this.invoices = invoices;
      this.collectionSize = invoices.length;
      this.infoFound = this._inFound(this.invoices);
    });
    this.page = 1;
    this.pageSize = 15;
  }

  public modifiedInvoice(): InvoiceInterface[] {
    return this.invoices.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
  private _inFound(invoices: InvoiceInterface[]): boolean {
    return invoices.length > 0 ? true : false;
  }
}
