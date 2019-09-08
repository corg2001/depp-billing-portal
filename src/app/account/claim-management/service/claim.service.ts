import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Claim } from '../model/claims.model';
import {
  JobStatus,
  ClaimOrderType,
  ClaimDisposition
} from '../model/claims.enums';

import { Observable, Subject } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
  HttpResponse
} from '@angular/common/http';
import { ConfigService } from '../../../core/config.service';
import { LoggerService } from '../../../core/logger.service';
import { ClaimPayloadInterface } from '../interface/claim.payload.interface';
import { ClaimFactoryService } from './factory/claim.factory.service';
import { ClaimServiceAbstract } from './claim.abstract.service';
import { environment } from 'src/environments/environment';
import { HttpParamEnum } from 'src/app/shared/enums/http-params.enums';

@Injectable({
  providedIn: 'root'
})
export class ClaimService implements ClaimServiceAbstract {
  private _claims: Claim[] = [];
  public claims$: BehaviorSubject<Claim[]>;
  constructor(
    private _configService: ConfigService,
    private _httpClient: HttpClient,
    private _loggerService: LoggerService
  ) {}

  public getClaims(
    completion: Subject<boolean>,
    claimData: BehaviorSubject<ClaimPayloadInterface[]>
  ): void {
    const partyId: string = this._configService.getPartyId();
    const companyInfo: string = this._configService.getCompanyInfo();
    const params: HttpParams = this.getClaimParams(partyId, companyInfo);
    this._httpClient.get(environment.claimsUrl, { params }).subscribe(
      (data: any) => {
        this.getClaimsSuccessHandler(completion, claimData, data);
      },
      (error: any) => {
        this.getClaimsFailureHandler(completion, error);
      }
    );
  }

public getClaimParams(partyId: string, companyInfo: string): HttpParams {
    return new HttpParams()
      .set(HttpParamEnum.vendorId, partyId)
      .set(HttpParamEnum.companyInfo, companyInfo);
  }

  public getClaimsSuccessHandler(
    completion: Subject<boolean>,
    claimData: BehaviorSubject<any>,
    response: Observable<HttpResponse<ClaimPayloadInterface[]>>
  ): void {
    this._loggerService.action('Successfully obtain claim data');
    claimData.next(response);
    completion.next(true);
  }
  public getClaimsFailureHandler(
    completion: Subject<boolean>,
    errorResponse: Observable<HttpErrorResponse>
  ): void {
    this._loggerService.error('Unable to retrieve claim data');
    completion.next(false);
  }

  public search(
    claimData: Claim[],
    name?: string,
    jobId?: string,
    address?: string
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
        : claim;
    });
  }

  public authInvoiceRedirect(
    jobNumber: string,
    dataSubject$: Subject<any>,
    completedSubject$: Subject<boolean>
  ): void {
    const partyId: string = this._configService.getPartyId();
    const params: HttpParams = this.getAuthInvoiceParams(partyId, jobNumber);
    this._httpClient.get(environment.authInoviceUrl, { params }).subscribe(
      (data: any) => {
        this.authInvoiceSuccessHandler(dataSubject$, completedSubject$, data);
      },
      (error: any) => {
        this.authInvoiceErroreHandler(dataSubject$, completedSubject$, error);
      }
    );
  }

  public getAuthInvoiceParams(
    partyId: string,
    jobNumber: string
  ): HttpParams {
    return new HttpParams()
      .set(HttpParamEnum.vendorId, partyId)
      .set(HttpParamEnum.jobNumber, jobNumber);
  }

  public authInvoiceSuccessHandler(dataSubject$: Subject<any>, completedSubject$: Subject<boolean>, response: any): void {
    completedSubject$.next(true);
    dataSubject$.next(response);
  }

  public authInvoiceErroreHandler(dataSubject$: Subject<any>, completedSubject$: Subject<boolean>, response: any): void {
    completedSubject$.next(false);
    dataSubject$.next(response);
  }
}
