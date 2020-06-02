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

  abstract getClaims(
    completion$: Subject<boolean>,
    error$: Subject<boolean>,
    claimData: BehaviorSubject<ClaimPayloadInterface[]>
  ): void;
  abstract getClaimsSuccessHandler(
    completion$: Subject<boolean>,
    error$: Subject<boolean>,
    claimData$: BehaviorSubject<any>,
    response: ClaimPayloadInterface[]
  ): void;
  abstract getClaimsFailureHandler(
    completion$: Subject<boolean>,
    error$: Subject<boolean>
  ): void;
  abstract search(
    claimData: Claim[],
    name?: string,
    jobId?: string,
    address?: string
  ): Claim[];

  abstract authInvoiceRedirect(
    jobNumber: string,
    vendorId: string,
    data$: BehaviorSubject<any>,
    completion$: Subject<boolean>,
    error$: Subject<boolean>,
    errorMessage$: Subject<string>
  ): void;

  abstract getAuthInvoiceParams(
    vendorId: string,
    jobNumber: string
  ): HttpParams;

  abstract authInvoiceSuccessHandler(data$: BehaviorSubject<any>, completion$: Subject<boolean>,
    error$: Subject<boolean>, response: any): void;

  abstract authInvoiceErroreHandler(derror$: Subject<boolean>, errorMessage$: Subject<string>, error: any): void;

  abstract setJobDetail(jobDetail: JobDetailInterface): void;

  abstract getJobDetail(): JobDetailInterface;

  abstract submitDiagnosisForm(
    companyInfo: string,
    formType: string,
    jobDetail: JobDetailInterface,
    blobData: Blob,
    isSuccess$: Subject<any>,
    isError$: Subject<boolean>
  ): void;

}
