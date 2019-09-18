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
    const partyId: string = this._configService.getVendorId();
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
    data$: BehaviorSubject<any>,
    completion$: Subject<boolean>,
    error$: Subject<boolean>,
    errorMessage$: Subject<string>
  ): void {
    const vendorId: string = this._configService.getVendorId();
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

  public authInvoiceErroreHandler(error$: Subject<boolean>, errorMessage$: Subject<string>,  error: any): void {
    error$.next(true);
    errorMessage$.next(error.error.message);
    this._loggerService.error(` unable to get auth portal url <br/> ${error.error.message}`);
  }
}
