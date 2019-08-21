import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {
  @Input() public paymentHistorySubject$?: BehaviorSubject<any> = new BehaviorSubject([]);
  @Output() updatedSearchEmitter: EventEmitter<[]> = new EventEmitter<[]>();
  public searchForm: FormGroup;
  public originalPaymentHistory: [];

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.searchForm = this._formBuilder.group({
      startDate: [''],
      endtDate: [''],
      referenceId: ['']
    });
  }

  public search(form: FormGroup): void {
    // form.controls.startDate.value || form.controls.endtDate.value || form.controls.referenceId.value ? this.updatedSearchEmitter.emit()
  }
}
