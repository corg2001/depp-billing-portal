import { Component, OnInit, Input, ViewChild, ElementRef, QueryList, ViewChildren, OnChanges, SimpleChanges } from '@angular/core';
import { PaymentHistoryInterface } from '../../interface/payment-history.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs';
import { PaymentAbstractService } from '../../service/abstract/payment.abstract.service';
import { InvoiceModalComponent } from '../invoice-modal/invoice-modal.component';
import { SortableHeaderDirective } from 'src/app/core/directive/sortable-header.directive';
import { SortDirectionEnums } from 'src/app/core/enums/sort-direction.enums';
import { SortEventInterface } from 'src/app/core/interface/sort-event.interface';
import * as Money from 'js-money';
import { environment } from 'src/environments/environment';
import { SearchFormValues } from 'src/app/shared/models/search-form-values.interface';

@Component({
  selector: 'app-payment-table',
  templateUrl: './payment-table.component.html',
  styleUrls: ['./payment-table.component.scss']
})
export class PaymentTableComponent implements OnInit, OnChanges {
  @Input() public paymentHistory$: BehaviorSubject<PaymentHistoryInterface[]> = new BehaviorSubject([]);
  @Input() public updatedPaymentHistory$: BehaviorSubject<PaymentHistoryInterface[]> = new BehaviorSubject([]);
  @Input() public isCompleted: boolean = false;
  @Input() public searchFormValue?: SearchFormValues;
  @ViewChild('invoiceModal') public modalHtml: ElementRef;
  @ViewChildren(SortableHeaderDirective) headers: QueryList<SortableHeaderDirective>;

  public paymentHistory: PaymentHistoryInterface[] = [];
  public page: number;
  public pageSize: number;
  public collectionSize: number = 0;
  public hasHistories: boolean;
  public noHistoryMsg: string;
  constructor(private _modalService: NgbModal, private _paymentService: PaymentAbstractService) { }

  public ngOnChanges(change: SimpleChanges): void {
    this.noHistoryMsg = this.noPaymentsMsg;
  }

  ngOnInit() {

    this.updatedPaymentHistory$.subscribe((updatedPaymentHistory) => {
      this.paymentHistory = updatedPaymentHistory;
      this.hasHistories = this._isHistoryFound(updatedPaymentHistory);
      this._sortList('paymentDate', SortDirectionEnums.Descending);
    });
    this.paymentHistory$.subscribe((paymenHistory: PaymentHistoryInterface[]) => {
      this.paymentHistory = paymenHistory;
      this.collectionSize = paymenHistory.length;
      this.hasHistories = this._isHistoryFound(paymenHistory);
      this._sortList('paymentDate', SortDirectionEnums.Descending);
    });
    this.page = 1;
    this.pageSize = 15;
  }

  public get noPaymentsMsg(): string {
    return this.noHistoryMsg = `No payments in the selected timeframe ${this.searchFormValue ? this.getStartDateSearched(this.searchFormValue) : null} ${this.searchFormValue ? this.getEndDateSearched(this.searchFormValue) : null}.`;
  }

  public getStartDateSearched(formValues: SearchFormValues): string {
    return formValues.startDate ? `with start date: ${formValues.startDate}` : '';
  }

  public getEndDateSearched(formValues: SearchFormValues): string {
    return formValues.endDate ? `and end date: ${formValues.endDate}` : '';
  }

  public getNameSearched(formValues: SearchFormValues): string {
    return formValues.name ? `, with the name of: ${formValues.name}` : '';
  }

  private _isHistoryFound(paymentHistory: PaymentHistoryInterface[]): boolean {
    return paymentHistory.length > 0;
  }

  public viewInvoice(data: PaymentHistoryInterface): void {
    this._paymentService.setInvoicDetails(data);
    this._modalService.open(InvoiceModalComponent, { size: 'lg'});
  }

  public modifiedPaymentHistory(): PaymentHistoryInterface[] {
    return this.paymentHistory.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  public onSort(sort: SortEventInterface): void {
    if (!this.headers || !this.hasHistories) {
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
