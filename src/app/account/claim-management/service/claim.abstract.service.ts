import { Injectable } from '@angular/core';
import {
  HttpParams,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { Claim } from '../model/claims.model';
import { ClaimPayloadInterface } from '../interface/claim.payload.interface';

@Injectable({
  providedIn: 'root'
})
export abstract class ClaimServiceAbstract {
  constructor() {}

  abstract getClaims(
      completion: Subject<boolean>,
      claimData: BehaviorSubject<ClaimPayloadInterface[]>
  ): void;
  abstract getClaimParams(partyId: string, companyInfo: string): HttpParams;
  abstract getClaimsSuccessHandler(
    completion: Subject<boolean>,
    claimData: BehaviorSubject<any>,
    response: Observable<HttpResponse<ClaimPayloadInterface[]>>
  ): void;
  abstract getClaimsFailureHandler(
    completion: Subject<boolean>,
    errorResponse: Observable<HttpErrorResponse>
  ): void;
  abstract search(
    claimData: Claim[],
    name?: string,
    jobId?: string,
    address?: string
  ): Claim[];

  abstract  authInvoiceRedirect(
    jobNumber: string,
    dataSubject$: Subject<any>,
    completedSubject$: Subject<boolean>
  ): void;

  abstract  getAuthInvoiceParams(
    partyId: string,
    jobNumber: string
  ): HttpParams;

abstract  authInvoiceSuccessHandler(dataSubject$: Subject<any>, completedSubject$: Subject<boolean>, response: any): void;

abstract authInvoiceErroreHandler(dataSubject$: Subject<any>, completedSubject$: Subject<boolean>, response: any): void;
}
