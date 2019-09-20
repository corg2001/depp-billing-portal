import { Injectable } from "@angular/core";
import { Subject, BehaviorSubject } from "rxjs";
import { HttpParams, HttpErrorResponse } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export abstract class CalendarAbstractService {
  constructor() {}

  abstract getCalendarInfo(
    calendar$: BehaviorSubject<any>,
    completion$: Subject<boolean>,
    error$: Subject<boolean>,
    startDate: string,
    endDate: string
  ): void;

  abstract buildCalenderParams(
    venderId: string,
    companyInfo: string,
    startDate: string,
    endDate: string
  ): HttpParams;

  abstract calendarSuccessHandler(
    calendar$: BehaviorSubject<any>,
    completion$: Subject<boolean>,
    error$: Subject<boolean>,
    response: any
  ): void;

  abstract calendarErrorHandler(
    error$: Subject<boolean>,
    completion$: Subject<boolean>,
    error: HttpErrorResponse
  ): void;
  abstract tradeSearch(tradeDetails: any[], trade: string): any[];
  abstract stateSearch(tradeDetails: any[], state: string): any[];
}
