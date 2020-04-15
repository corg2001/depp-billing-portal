import { Component, OnInit, Input, ViewChild, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { PaymentHistoryInterface } from '../../interface/payment-history.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs';
import { PaymentAbstractService } from '../../service/abstract/payment.abstract.service';
import { InvoiceModalComponent } from '../invoice-modal/invoice-modal.component';
import { SortableHeaderDirective } from 'src/app/core/directive/sortable-header.directive';
import { SortDirectionEnums } from 'src/app/core/enums/sort-direction.enums';
import { SortEventInterface } from 'src/app/core/interface/sort-event.interface';
import * as Money from 'js-money';

@Component({
  selector: 'app-payment-table',
  templateUrl: './payment-table.component.html',
  styleUrls: ['./payment-table.component.scss']
})
export class PaymentTableComponent implements OnInit {
  @Input() public paymentHistory$: BehaviorSubject<PaymentHistoryInterface[]> = new BehaviorSubject([]);
  @Input() public updatedPaymentHistory$: BehaviorSubject<PaymentHistoryInterface[]> = new BehaviorSubject([]);

  @ViewChild('invoiceModal') public modalHtml: ElementRef;
  @ViewChildren(SortableHeaderDirective) headers: QueryList<SortableHeaderDirective>;

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
      this._sortList('paymentDate', SortDirectionEnums.Descending);
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

  public onSort(sort: SortEventInterface): void {
    if (!this.headers || !this.historiesFound) {
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
      this.paymentHistory = this.paymentHistory.sort((a: PaymentHistoryInterface, b: PaymentHistoryInterface) => {
        if (column === 'paymentAmount') {
          const result = this._compareMoney(a.paymentAmount, b.paymentAmount);
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
}
