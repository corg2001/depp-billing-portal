import { Component, OnInit } from '@angular/core';
import { CalendarAbstractService } from './service/abstract/calendar.abstract.service';
import { BehaviorSubject, Subject } from 'rxjs';
import * as moment from 'moment';
import * as dateFormat from 'dateformat';
import { CalendarEnums } from 'src/app/shared/enums/calendar.enums';
import * as _ from 'lodash';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  public calendarDate: string;
  public calendar$: BehaviorSubject<any> = new BehaviorSubject([]);
  public error$: Subject<boolean> = new Subject();
  public completion$: Subject<boolean> = new Subject();
  public loading: boolean;
  public calendarData: any[] = [];
  public tradeDetails$: BehaviorSubject<any[]> = new BehaviorSubject([]);

  constructor(private _calendarService: CalendarAbstractService) {}

  ngOnInit() {
    this.loading = false;
    this.getCalenderInfo(dateFormat(new Date(), CalendarEnums.yearMonthDay), this.calendar$, this.completion$, this.error$);
  }

  public handleDateChange(date: string) {
    this.calendarDate = date;
    this.getCalenderInfo(date, this.calendar$, this.completion$, this.error$);
  }

  public getCalenderInfo(startDate: string, calendar$: BehaviorSubject<any>, completion$: Subject<boolean>,
    error$: Subject<boolean>): void {
    this.loading = true;
    const endDate: string = dateFormat(
      moment(startDate).add(1, 'd'),
      CalendarEnums.yearMonthDay
    );
    this._calendarService.getCalendarInfo(
      calendar$,
      completion$,
      error$,
      dateFormat(startDate, CalendarEnums.yearMonthDay),
      endDate
    );
    calendar$.subscribe((data: any) => {
      const _tradeDeatails: any[] = [];
      const _trades: string[] = [];
      const _serviceCalls: any[] = [];
      let stateCodes: any[];
      let serviceCalls: any[];
      let trades: string[];
      this.calendarData = data;
      this.calendarData.forEach((calendarInfo: any) => {
        _tradeDeatails.push(_.flatten(calendarInfo.trade_details));
        calendarInfo.trade_details.forEach((tradeDeatails: any) => {
          _trades.push(tradeDeatails.trade);
          _serviceCalls.push(tradeDeatails.service_call_details);
        });
      });
      trades = _.uniq(_trades);
      stateCodes = this._getStateCodes(_serviceCalls);
      serviceCalls = _.flatten(_serviceCalls);
      this.tradeDetails$.next(_tradeDeatails);
    });
    this.isLoading(completion$);
  }

  public isLoading(completion$: Subject<boolean>): void {
    completion$.subscribe((completed: boolean) => {
      completed === true ? (this.loading = false) : (this.loading = true);
    });
  }

  private _getTrades(trades: string[]): string[] {
    return _.uniq(trades);
  }

  private _getStateCodes(serviceCalls: any[]): string[] {
    const _serviceCalls: any[] = _.flatten(serviceCalls);
    const stateCodes: string[] = [];
    _serviceCalls.forEach((serviceCall: any) => {
      stateCodes.push(serviceCall.state_code);
    });
    return _.uniq(stateCodes);
  }
}
