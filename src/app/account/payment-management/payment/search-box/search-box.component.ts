import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { PaymentService } from '../../service/payment.service';
import { PaymentHistoryInterface } from '../../interface/payment-history.interface';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit, OnChanges {
  @Input() public paymentHistory$: BehaviorSubject<PaymentHistoryInterface[]> = new BehaviorSubject([]);
  @Output() public updatePaymentHistoryEmitter: EventEmitter<PaymentHistoryInterface[]> = new EventEmitter<PaymentHistoryInterface[]>();
  public searchForm: FormGroup;
  private _paymentHistoryCopy: PaymentHistoryInterface[];

  constructor(private _formBuilder: FormBuilder, private _paymentService: PaymentService) {}

  ngOnChanges(): void {
    this._paymentHistoryCopy = _.clone(this.paymentHistory$.getValue());
  }

  ngOnInit(): void {
    this.paymentHistory$.subscribe((paymentHistory: PaymentHistoryInterface[]) => {
      this._paymentHistoryCopy = paymentHistory;
    });
    this.searchForm = this._formBuilder.group({
      address: [''],
      customerName: [''],
      referenceId: ['']
    });
  }

  public search(form: FormGroup): void {
    form.controls.address.value ||
    form.controls.customerName.value ||
     form.controls.referenceId.value ?
    this.updatePaymentHistoryEmitter.emit(this._paymentService.search(this._paymentHistoryCopy,
      form.controls.address.value,
      form.controls.customerName.value,
      form.controls.referenceId.value)) : console.log(this.paymentHistory$.getValue());
  }
  

  get sf(): any {
    return this.searchForm.controls;
  }
}
