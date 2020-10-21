import { Injectable } from '@angular/core';
import {
  HttpParams,
} from '@angular/common/http';
import { Subject, BehaviorSubject } from 'rxjs';
import { Claim } from '../../model/claims.model';
import { ClaimPayloadInterface } from '../../interface/claim.payload.interface';
import { JobDetailInterface } from './../../interface/job-detail.interface';

@Injectable({
  providedIn: 'root'
})
export abstract class ClaimServiceAbstract {

  constructor() { }

  public abstract getClaims(
    completion$: Subject<boolean>,
    error$: Subject<boolean>,
    claimData: BehaviorSubject<ClaimPayloadInterface[]>,
    startDate?: string,
    endDate?: string
  ): void;

  public abstract getClaimsSuccessHandler(
    completion$: Subject<boolean>,
    error$: Subject<boolean>,
    claimData$: BehaviorSubject<any>,
    response: ClaimPayloadInterface[]
  ): void;

  public abstract getClaimsFailureHandler(
    completion$: Subject<boolean>,
    error$: Subject<boolean>
  ): void;

  public abstract search(
    claimData: Claim[],
    name?: string,
    jobId?: string,
    address?: string,
    type?: string,
    fromDate?: string,
    toDate?: string
  ): Claim[];

  public abstract authInvoiceRedirect(
    jobNumber: string,
    vendorId: string,
    authorizeUrl$: Subject<string>,
    completion$: Subject<boolean>,
    error$: Subject<boolean>,
    errorMessage$: Subject<string>
  ): void;

  public abstract getAuthInvoiceParams(
    vendorId: string,
    jobNumber: string
  ): HttpParams;

  public abstract authInvoiceSuccessHandler(data$: BehaviorSubject<any>, completion$: Subject<boolean>,
    error$: Subject<boolean>, response: any): void;

  public abstract authInvoiceErroreHandler(derror$: Subject<boolean>, errorMessage$: Subject<string>, error: any): void;

  public abstract setJobDetail(jobDetail: JobDetailInterface): void;

  public abstract getJobDetail(): JobDetailInterface;

  public abstract submitDiagnosisForm(
    companyInfo: string,
    formType: string,
    jobDetail: JobDetailInterface,
    blobData: Blob,
    isSuccess$: Subject<any>,
    isError$: Subject<boolean>
  ): void;

  public abstract getClaimInDateRange(claims: Claim[], fromDate?: string, toDate?: string): Claim[];

  public abstract getClaimsFromDate(fromDate: string, claims: Claim[]): Claim[];

  public abstract getClaimFromToDate(toDate: string, claims: Claim[]): Claim[];
}
