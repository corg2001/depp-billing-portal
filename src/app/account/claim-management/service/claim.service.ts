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

@Injectable({
  providedIn: 'root'
})
export class ClaimService implements ClaimServiceAbstract {
  public claims$: BehaviorSubject<Claim[]>;
  public il04_vendorId$: Subject<string> = new Subject<string>();
  public il03_vendorId$: Subject<string> = new Subject<string>();

  constructor(
    private _configService: ConfigService,
    private _httpClient: HttpClient,
    private _loggerService: LoggerService
  ) { }

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
    jobStatus?: string,
    type?: string,
    disposition?: string
  ): Claim[] {
    return claimData.filter((claim: Claim) => {
      const nameInput = name.toLowerCase();
      const jobIdInput = jobId.toLowerCase();
      const addressInput = address.toLowerCase();
      return name
        ? claim.customerName.toLowerCase().includes(nameInput)
        : jobId
          ? claim.jobNumber.toLowerCase().includes(jobIdInput)
          : address
            ? claim.serviceAddress.toLowerCase().includes(addressInput)
            : jobStatus
              ? claim.jobStatus.toLowerCase().includes(jobStatus)
              : type
                ? claim.claimType.toLowerCase().includes(type)
                : disposition
                  ? claim.claimDisposition.toLowerCase().includes(disposition)
                  : claim;
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

}
