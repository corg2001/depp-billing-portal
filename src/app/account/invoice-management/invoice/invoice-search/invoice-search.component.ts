import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder} from '@angular/forms';
import { InvoiceService } from '../../invoice.service';
@Component({
  selector: 'app-invoice-search',
  templateUrl: './invoice-search.component.html',
  styleUrls: ['./invoice-search.component.scss']
})
export class InvoiceSearchComponent implements OnInit {

  public searchForm: FormGroup;

  constructor(private _fb: FormBuilder, private _invoiceService: InvoiceService) { }

  ngOnInit() {
    this.searchForm = this._fb.group({
      startDate: [''],
      endDate: [''],
      address: ['']
    });
  }

  public search(form: FormGroup): void {
    this._invoiceService.search(form.controls.startDate.value, form.controls.endDate.value, form.controls.address.value);
  }

  get sf(): any {
    return this.searchForm.controls;
  }
}
