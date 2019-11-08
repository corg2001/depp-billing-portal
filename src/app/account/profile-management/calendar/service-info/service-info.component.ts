import { Component, OnInit, Input, OnChanges } from '@angular/core';
import * as dateFormat from 'dateformat';
import { CalendarEnums } from 'src/app/shared/enums/calendar.enums';
import { Subject, BehaviorSubject } from 'rxjs';
import * as _ from 'lodash';
import { environment } from 'src/environments/environment';
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
  public updatedTradeDetails: any[] = [];
  public headertext: string;
  public emergencyCalltext: string;
  public trades: string[];
  public stateCodes: string[];
  public noInfoText: string;
  public infoFound: boolean;



  constructor() { }

  ngOnChanges(): void {
    this.formatDate(this.calendarDate);
  }

  ngOnInit(): void {
    this.noInfoText = `Oh no! Your call volume is not setup. Please reach out to your Territory Manager to get started.`;
    this.calendarDate = this.formatDate((new Date()).toString());
    this.headertext = 'service call information for ';
    this.emergencyCalltext = 'You are accepting emergency calls. If you want to change this, please reach out to your Territory Manager';
    this.tradeDetails$.subscribe((tradeDetails: any[]) => {
      this.tradeDetails = tradeDetails;
      this.infoFound = this._infoFound(this.tradeDetails);
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

  private _infoFound(tradeDeatils: any[]): boolean {
    return tradeDeatils.length > 0 ? true : false;

  }
}
