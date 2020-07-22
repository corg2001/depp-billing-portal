import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { FormGroup, FormBuilder } from '@angular/forms';
import { InvoiceService } from '../../service/invoice.service';
import { BehaviorSubject } from 'rxjs';
import * as _ from 'lodash';
import { InvoiceInterface } from '../../interface/invoice.interface';
import { DatepickerViewModel } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker-view-model';
import { NgbDatepicker, NgbDate } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-invoice-search',
  templateUrl: './invoice-search.component.html',
  styleUrls: ['./invoice-search.component.scss']
})
export class InvoiceSearchComponent implements OnInit {
  @Input() public invoices$: BehaviorSubject<
    InvoiceInterface[]
  > = new BehaviorSubject([]);
  @Output() doSearch: EventEmitter<FormGroup> = new EventEmitter();
  public invoices: InvoiceInterface[] = [];
  public  model: any;
  public searchForm: FormGroup;
  public datepicker: NgbDatepicker;
  public startDate: string;

  constructor(
    private _fb: FormBuilder
  ) {}

  ngOnInit() {
    this.searchForm = this._fb.group({
      startDate: [''],
      endDate: [''],
      address: ['']
    });
  }

  public search(form: FormGroup): void {
    this.doSearch.emit(form);
  }

  get sf(): any {
    return this.searchForm.controls;
  }
}
