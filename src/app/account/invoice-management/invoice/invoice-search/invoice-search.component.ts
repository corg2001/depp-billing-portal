import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { FormGroup, FormBuilder } from '@angular/forms';
import { InvoiceService } from '../../service/invoice.service';
import { BehaviorSubject } from 'rxjs';
import * as _ from 'lodash';
import { InvoiceInterface } from '../../interface/invoice.interface';
@Component({
  selector: 'app-invoice-search',
  templateUrl: './invoice-search.component.html',
  styleUrls: ['./invoice-search.component.scss']
})
export class InvoiceSearchComponent implements OnInit, OnChanges {
  @Input() public invoices$: BehaviorSubject<
    InvoiceInterface[]
  > = new BehaviorSubject([]);
  public invoices: InvoiceInterface[] = [];

  public searchForm: FormGroup;
  private invoicesCopy: any;

  constructor(
    private _fb: FormBuilder,
    private _invoiceService: InvoiceService
  ) {}

  ngOnChanges(): void {
    this.invoicesCopy = _.clone(this.invoices$.getValue());
  }
  ngOnInit() {
    this.searchForm = this._fb.group({
      startDate: [''],
      endDate: [''],
      address: ['']
    });
  }

  public search(form: FormGroup): void {
    form.controls.startDate.value ||
    form.controls.endDate.value ||
    form.controls.address.value
      ? this.invoices$.next(
          this._invoiceService.search(
            this.invoicesCopy,
            form.controls.startDate.value,
            form.controls.endDate.value,
            form.controls.address.value
          )
        )
      : this.invoices$.next(this.invoicesCopy);
  }

  get sf(): any {
    return this.searchForm.controls;
  }
}
