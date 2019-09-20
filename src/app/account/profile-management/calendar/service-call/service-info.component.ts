import { Component, OnInit, Input, OnChanges } from '@angular/core';
import * as dateFormat from 'dateformat';
import { CalendarEnums } from 'src/app/shared/enums/calendar.enums';
import { Subject, BehaviorSubject } from 'rxjs';
import * as _ from 'lodash';
@Component({
  selector: 'app-service-info',
  templateUrl: './service-info.component.html',
  styleUrls: ['./service-info.component.scss']
})
export class ServiceInfoComponent implements OnInit, OnChanges {
  @Input() calendarDate: string;
  @Input() tradeDetails$: BehaviorSubject<any[]> = new BehaviorSubject([]);
  @Input() loading: boolean;
  public tradeDetails: any[];
  public headertext: string;
  public emergencyCalltext: string;
  public trades: string[];
  public stateCodes: string[];



  constructor() { }

  ngOnChanges(): void {
    this.formatDate(this.calendarDate);
  }

  ngOnInit(): void {
    this.calendarDate = this.formatDate((new Date()).toString());
    this.headertext = 'service call information for ';
    this.emergencyCalltext = 'You are accepting emergency calls. If you want to change this, please reach out to your Territoy Manager';
    this.tradeDetails$.subscribe((tradeDetails: any[]) => {
      this.tradeDetails = tradeDetails;
      this.trades = this._getTrades(this.tradeDetails);
      this.stateCodes = this._getStateCodes(this.tradeDetails);
    });
  }
  public formatDate(date: string): string {
    return dateFormat(date, CalendarEnums.monthDayYear);
  }

  public upateTradDetails(tradeDetails: any[]): void {
    this.tradeDetails = tradeDetails;
  }

  private _getTrades(tradeDetailsList: any[]): string[] {
    const _trades: string[] = [];
    tradeDetailsList.forEach((tradeDetails: any[]) => {
      tradeDetails.forEach((tradeDetail: any) => {
        _trades.push(tradeDetail.trade);
      });
    });
    return _.uniq(_trades);
  }

  private _getStateCodes(tradeDetailsList: any[]): string[] {
    const serviceCalls: any[]  = [];
    tradeDetailsList.forEach((tradeDetails: any[]) => {
      tradeDetails.forEach((tradeDetail: any) => {
        serviceCalls.push(tradeDetail.service_call_details);
      });
    });
    const flattenServiceCalls: any[] = _.flatten(serviceCalls);
    const stateCodes: string[] = [];
    flattenServiceCalls.forEach((serviceCall: any) => {
      stateCodes.push(serviceCall.state_code);
    });
    return _.uniq(stateCodes);
  }
}
