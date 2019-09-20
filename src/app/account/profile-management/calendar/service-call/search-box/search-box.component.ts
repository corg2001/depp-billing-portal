import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CalendarAbstractService } from '../../service/abstract/calendar.abstract.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {
  @Input() public tradeDetails$: BehaviorSubject<any[]> = new BehaviorSubject([]);
  @Input() public trades?: any[] = [];
  @Input() public stateCodes?: any[] = [];
  @Output() public updateCalendarInfo: EventEmitter<any[]> = new EventEmitter<any[]>();
  public calendarForm: FormGroup;
  constructor(private _fb: FormBuilder, private _calenderService: CalendarAbstractService) { }

  ngOnInit() {
    this.calendarForm = this._fb.group({
      trade: [''],
      state: ['']
    });
  }

  public tradeSearch(form: FormGroup): void {
   const trade: string = form.controls.trade.value;
   trade ? this.updateCalendarInfo.emit(this._calenderService.tradeSearch(this.tradeDetails$.getValue(), trade))
   : this.updateCalendarInfo.emit(this.tradeDetails$.getValue());
  }

  public stateSearch(form: FormGroup): void {
    const state: string = form.controls.state.value;
    state ? this.updateCalendarInfo.emit(this._calenderService.stateSearch(this.tradeDetails$.getValue(), state)) 
    : this.updateCalendarInfo.emit(this.tradeDetails$.getValue()); 
  }

}
