import { ClaimOrderType } from './../../../account/claim-management/model/claims.enums';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as _ from 'lodash';
import { NgbDatepicker, NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Input() fromDate?: NgbDate;
  @Input() toDate?: NgbDate;
  @Input() allowFilter?: boolean = false;
  @Input() searcOnInit?: boolean = false;
  @Output() doSearch: EventEmitter<FormGroup> = new EventEmitter();

  public model: any;
  public searchForm: FormGroup;
  public datepicker: NgbDatepicker;
  public startDate: string;
  public hoveredDate?: NgbDate;
  public maxDate?: NgbDate;
  public minDate?: NgbDate;
  public isShowingFilters: boolean;
  public claimTypes: ClaimOrderType[];
  public filterMsg: string;

  constructor(
    private _fb: FormBuilder,
    private _calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
  ) {
    this.filterMsg = 'Filter within results';
    this.claimTypes = [ClaimOrderType.repair, ClaimOrderType.replace, ClaimOrderType.surge];
    this.hoveredDate = null;
    this.fromDate = this.fromDate ? this.fromDate : _calendar.getPrev(_calendar.getToday(), 'd', 60);
    this.toDate = this.toDate ? this.toDate : _calendar.getToday();
    this.maxDate = this.toDate;
    this.isShowingFilters = false;
  }

  public toggleAllowFilter = (): void => {
    this.isShowingFilters = !this.isShowingFilters;
  }
  ngOnInit() {
    this.searchForm = this._fb.group({
      startDate: [''],
      endDate: [''],
      name: [''],
      jobId: [''],
      address: [''],
      type: ['']
    });
    if (this.searcOnInit) {
      this.search(this.searchForm);

    }
  }

  public updateClaimType = (calimValue: string): void => {
    this.searchForm.controls.type.patchValue(calimValue);
  }

  public search(form: FormGroup): void {
    const startDate: string = `${this.fromDate.year}-${this.fromDate.month}-${this.fromDate.day}`;
    const endDate: string = `${this.toDate.year}-${this.toDate.month}-${this.toDate.day}`;
    this.searchForm.controls.startDate.patchValue(startDate);
    this.searchForm.controls.endDate.patchValue(endDate);
    this.doSearch.emit(form);
  }

  get sf(): any {
    return this.searchForm.controls;
  }
  public onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date && this.maxAllowDate(date) && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  public isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate)
      && date.before(this.hoveredDate) && this.maxAllowDate(date);
  }

  public isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  public isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

  public validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this._calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }

  public maxAllowDate(date: NgbDate): boolean {
    return date && !date.after(this._calendar.getNext(this.fromDate, 'd', 60)) && !date.after(this._calendar.getToday());
  }
}
