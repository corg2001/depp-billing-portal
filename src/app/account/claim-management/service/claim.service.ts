import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Claim } from '../model/claims.model';

import { Subject } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams
} from '@angular/common/http';
import { ConfigService } from '../../../core/config.service';
import { LoggerService } from '../../../core/logger.service';
import { ClaimPayloadInterface } from '../interface/claim.payload.interface';
import { ClaimServiceAbstract } from './abstract/claim.abstract.service';
import { environment } from 'src/environments/environment';
import { HttpParamEnum } from 'src/app/shared/enums/http-params.enums';
import { JobDetailInterface } from './../interface/job-detail.interface';
import { LocalStorageEnum } from 'src/app/core/enums/local-storage.enums';
import * as moment from 'moment-timezone';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
@Injectable({
  providedIn: 'root'
})
export class ClaimService implements ClaimServiceAbstract {
  public claims$: BehaviorSubject<Claim[]>;
  public il04_vendorId$: Subject<string> = new Subject<string>();
  public il03_vendorId$: Subject<string> = new Subject<string>();
  private _defaultFromDate: NgbDate;
  private _defaultToDate: NgbDate;

  constructor(
    private _configService: ConfigService,
    private _httpClient: HttpClient,
    private _loggerService: LoggerService,
    private _calendar: NgbCalendar
  ) {
    this._defaultFromDate = _calendar.getPrev(_calendar.getToday(), 'd', 60);
    this._defaultToDate = _calendar.getToday();
  }

  public getClaims(
    isComplete$: Subject<boolean>,
    isError$: Subject<boolean>,
    claimData$: BehaviorSubject<ClaimPayloadInterface[]>,
  ): void {
    this._httpClient.get<ClaimPayloadInterface[]>(environment.claimsUrl)
      .subscribe((data: ClaimPayloadInterface[]) => {
        this.getClaimsSuccessHandler(isComplete$, isError$, claimData$, data);
      }, (error: HttpErrorResponse) => {
        this.getClaimsFailureHandler(isComplete$, isError$);
      });
  }

  public getClaimsSuccessHandler(
    completion$: Subject<boolean>,
    error$: Subject<boolean>,
    claimData$: BehaviorSubject<any>,
    response: ClaimPayloadInterface[]
  ): void {
    this._loggerService.action('Successfully obtain claim data');
    claimData$.next(response);
    completion$.next(true);
    error$.next(false);
  }
  public getClaimsFailureHandler(
    completion$: Subject<boolean>,
    error$: Subject<boolean>
  ): void {
    this._loggerService.error('Unable to retrieve claim data');
    completion$.next(true);
    error$.next(true);
  }

  public search(
    claimData: Claim[],
    name?: string,
    jobId?: string,
    address?: string,
    type?: string,
    fromDate?: string,
    toDate?: string
  ): Claim[] {
    const claimsInDateRange: Claim[] = fromDate && toDate ?
      this.getClaimInDateRange(claimData, fromDate, toDate, ) :
      fromDate ? this.getClaimsFromDate(fromDate, claimData) : toDate ? this.getClaimFromToDate(toDate, claimData) : claimData;
    return claimsInDateRange.filter((claim: Claim) => {
      const nameInput = name.toLowerCase();
      const jobIdInput = jobId.toLowerCase();
      const addressInput = address.toLowerCase();

      const typeInput = type.toLowerCase();

      return type
        ? claim.claimType.toLowerCase().includes(typeInput)
        : jobId
          ? claim.jobNumber.toLowerCase().includes(jobIdInput)
          : address
            ? claim.serviceAddress.toLowerCase().includes(addressInput)
            : name
              ? claim.customerName.toLowerCase().includes(nameInput)
              : claim;
    });
  }
  public getClaimInDateRange(claims: Claim[], fromDate?: string, toDate?: string, ): Claim[] {
    const fromDateToFilter = fromDate ? fromDate : this._getDefaultFromDate(this._defaultFromDate);
    const toDateToFilter = toDate ? toDate : this._getDefaultToDate(this._defaultToDate);
    return claims.filter((claim: Claim) => {
      if (moment.utc(claim.dateRequested).isAfter(fromDateToFilter)
        && moment.utc(claim.dateRequested).isBefore(toDateToFilter)) {
        return claim;
      }
    });
  }

  public getClaimsFromDate(fromDate: string, claims: Claim[]): Claim[] {
    return claims.filter((claim: Claim) => {
      if (moment.utc(claim.dateRequested).isAfter(fromDate)) {
        return claim;
      }
    });

  }

  public getClaimFromToDate(toDate?: string, claims?: Claim[]): Claim[] {
    return claims.filter((claim: Claim) => {
      if (moment.utc(claim.dateRequested).isBefore(toDate)) {
        return claims;
      }
    });

  }

  public authInvoiceRedirect(
    jobNumber: string,
    vendorId: string,
    data$: BehaviorSubject<any>,
    completion$: Subject<boolean>,
    error$: Subject<boolean>,
    errorMessage$: Subject<string>
  ): void {
    const params: HttpParams = this.getAuthInvoiceParams(vendorId, jobNumber);
    this._httpClient.get(environment.authInoviceUrl, { params }).subscribe(
      (data: any) => {
        this.authInvoiceSuccessHandler(data$, completion$, error$, data);
      },
      (error: any) => {
        this.authInvoiceErroreHandler(error$, errorMessage$, error);
      }
    );
  }

  public getAuthInvoiceParams(
    vendorId: string,
    jobNumber: string
  ): HttpParams {
    return new HttpParams()
      .set(HttpParamEnum.vendorId, vendorId)
      .set(HttpParamEnum.jobNumber, jobNumber);
  }

  public authInvoiceSuccessHandler(data$: BehaviorSubject<any>, completion$: Subject<boolean>,
    error$: Subject<boolean>, response: any): void {
    completion$.next(true);
    error$.next(false);
    data$.next(response.url);
    this._loggerService.action('Successfully obtain auth Invoice data');
  }

  public authInvoiceErroreHandler(error$: Subject<boolean>, errorMessage$: Subject<string>, error: any): void {
    error$.next(true);
    errorMessage$.next(error.error.message);
    this._loggerService.error(` unable to get auth portal url <br/> ${error.error.message}`);
  }

  public setJobDetail(jobDetail: JobDetailInterface): void {
    localStorage.setItem(
      LocalStorageEnum.JobDetail,
      JSON.stringify(jobDetail)
    );
  }

  public getJobDetail(): JobDetailInterface {
    return JSON.parse(localStorage.getItem(LocalStorageEnum.JobDetail));
  }

  public submitDiagnosisForm(
    companyInfo: string,
    formType: string,
    jobDetail: JobDetailInterface,
    blobData: Blob,
    isSuccess$: Subject<any>,
    isError$: Subject<boolean>
  ): void {
    const formData = new FormData();
    formData.append('file', blobData, jobDetail.jobNumber + '.pdf');

    const params: HttpParams = new HttpParams()
      .set(HttpParamEnum.vendorId, jobDetail.vendorId)
      .set(HttpParamEnum.companyInfo, companyInfo)
      .set(HttpParamEnum.docType, formType)
      .set(HttpParamEnum.jobNumber, jobDetail.jobNumber);

    this._httpClient.post<any>(
      environment.submitDiagnosisUrl,
      formData,
      {
        params: params
      }
    ).subscribe(
      (response: any) => {
        isSuccess$.next(response);
      },
      (error: HttpErrorResponse) => {
        isError$.next(true);
      }
    );
  }

  private _getDefaultFromDate(fromDate: NgbDate): string {
    return `${fromDate.year}-${fromDate.month}-${fromDate.day}`;
  }

  private _getDefaultToDate(toDate: NgbDate): string {
    return `${toDate.year}-${toDate.month}-${toDate.day}`;
  }

}
