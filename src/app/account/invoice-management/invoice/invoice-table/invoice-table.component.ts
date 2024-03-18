import { Component, OnInit, Input, QueryList, ViewChildren, OnChanges } from '@angular/core';
import { InvoiceInterface } from '../../interface/invoice.interface';
import { SortableHeaderDirective } from 'src/app/core/directive/sortable-header.directive';
import { SortDirectionEnums } from 'src/app/core/enums/sort-direction.enums';
import { SortEventInterface } from 'src/app/core/interface/sort-event.interface';
import * as Money from 'js-money';
import { ExportExcelService } from 'src/app/shared/service/export-excel.service';
import * as moment from 'moment';

@Component({
  selector: 'app-invoice-table',
  templateUrl: './invoice-table.component.html',
  styleUrls: ['./invoice-table.component.scss']
})

export class InvoiceTableComponent implements OnInit, OnChanges {
  @Input() public invoiceData: InvoiceInterface[];
  @Input() public error: boolean;
  @Input() public completion: boolean;
  public exportJSON: any[] = [];

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

  constructor(private exportExcelService: ExportExcelService) { }

  public ngOnChanges(): void {
    this.invoices = this.invoiceData;

    this.collectionSize = this.invoices.length;
    this.infoFound = this.invoiceData.length > 0;
    this._sortList('claimDate', SortDirectionEnums.Descending);

    this.exportJSON = [];
    this.invoices.forEach((invoice: InvoiceInterface) => {
      this.exportJSON.push({
        'Claim ID': invoice.claimId,
        'Claim Date': moment(invoice.claimDate).format("MMM Do YY"),
        'Homeowner Name': invoice.customerName,
        'Service Address': invoice.serviceAddress,
        'Invoice No.': invoice.invoiceId,
        'Invoice Date': moment(invoice.invoiceDate).format("MMM Do YY"),
        'Amount': '$' + Number(invoice.invoiceAmount.amount).toLocaleString('en-US')
      })
    })
  }
  ngOnInit(): void {
    this.invoices = this.invoiceData;

    this.infoFound = this.invoiceData.length > 0;
    this.noInfoText = `No open invoices for the selected timeframe.`;
    this.page = 1;
    this.pageSize = 15;
  }

  public modifiedInvoice(): InvoiceInterface[] {
    return this.invoiceData.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
  private _inFound(invoices: InvoiceInterface[]): boolean {
    return invoices.length > 0;
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

  private _compareString(v1?: string, v2?: string) {
    return (v1 < v2) ? -1 : (v1 > v2) ? 1 : 0;
  }

  private _compareMoney(v1: Money, v2: Money): number {
    let num1: number = 0;
    let num2: number = 0;
    num1 = parseFloat(v1.amount);
    num2 = parseFloat(v2.amount);

    return num1 - num2;
  }

  public exportExcelFile() {
    this.exportExcelService.exportJsonAsExcelFile(this.exportJSON, 'open_invoices')
  }
}
