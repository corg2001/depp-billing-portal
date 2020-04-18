import { Component, OnInit, Input, QueryList, ViewChildren } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { InvoiceService } from 'src/app/account/invoice-management/service/invoice.service';
import { Invoice } from '../../model/invoice.model';
import { InvoiceInterface } from '../../interface/invoice.interface';
import { environment } from 'src/environments/environment';
import { SortableHeaderDirective } from 'src/app/core/directive/sortable-header.directive';
import { SortDirectionEnums } from 'src/app/core/enums/sort-direction.enums';
import { SortEventInterface } from 'src/app/core/interface/sort-event.interface';
import * as Money from 'js-money';
import { InvoicPaymentStatusEnum } from '../../model/enums/invoice-payment-status.enum';

@Component({
  selector: 'app-invoice-table',
  templateUrl: './invoice-table.component.html',
  styleUrls: ['./invoice-table.component.scss']
})

export class InvoiceTableComponent implements OnInit {
  @Input() public invoices$: BehaviorSubject<InvoiceInterface[]> = new BehaviorSubject([]);
  @Input() public error: boolean;
  @Input() public completion: boolean;

  @ViewChildren(SortableHeaderDirective) headers: QueryList<SortableHeaderDirective>;

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
    this.noInfoText = `Invoice information is not available. Please reach out to your Territory Manager for assistance.`;
    this.invoices$.subscribe((invoices: InvoiceInterface[]) => {
      this.invoices = invoices;
      this.invoices = this._filterUnpaidInvoices(invoices);
      this.collectionSize = invoices.length;
      this.infoFound = this._inFound(this.invoices);
      this._sortList('claimDate', SortDirectionEnums.Descending);
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

  public onSort(sort: SortEventInterface): void {
    if (!this.headers || !this.infoFound) {
      return;
    }

    this.headers.forEach(header => {
      if (header.appSortable !== sort.column) {
        header.direction = SortDirectionEnums.None;
      }
    });

    this._sortList(sort.column, sort.direction);
  }

  private _sortList(
    column: string,
    direction: string
  ): void {
    if (direction !== SortDirectionEnums.None && column !== '') {
      this.invoices = this.invoices.sort((a: InvoiceInterface, b: InvoiceInterface) => {
        if (column === 'invoiceAmount') {
          const result = this._compareMoney(a.invoiceAmount, b.invoiceAmount);
          return direction === SortDirectionEnums.Ascending ? result : -result;
        } else {
          const result = this._compareString(`${a[column]}`, `${b[column]}`);
          return direction === SortDirectionEnums.Ascending ? result : -result;
        }
      });
    }
  }

  private _compareString (v1?: string, v2?: string) {
    return (v1 < v2) ? -1 : (v1 > v2) ? 1 : 0;
  }

  private _compareMoney (v1: Money, v2: Money): number {
    let num1: number = 0;
    let num2: number = 0;
    num1 = parseFloat(v1.amount);
    num2 = parseFloat(v2.amount);

    return num1 - num2;
  }

  private _filterUnpaidInvoices(invoices: InvoiceInterface[]): InvoiceInterface[] {
    return invoices.filter((invoice: InvoiceInterface) => invoice.invoicePaymentStatus === InvoicPaymentStatusEnum.unpaid);
  }
}
