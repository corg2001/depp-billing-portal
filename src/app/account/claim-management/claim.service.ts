import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Claim } from './model/claims.model';

import { Observable, Subject } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
  HttpResponse
} from '@angular/common/http';
import { ConfigService } from '../../core/config.service';
import { LoggerService } from '../../core/logger.service';

@Injectable({
  providedIn: 'root'
})
export class ClaimService {
  private _claims: Claim[] = [];
  public claims$: BehaviorSubject<Claim[]>;
  constructor(
    private configService: ConfigService,
    private httpClient: HttpClient,
    private loggerService: LoggerService
  ) {}

  public getClaims(
    completion: Subject<boolean>,
    claimData: BehaviorSubject<Claim[]>
  ): void {
    const uri: string =
      'https://unify-hwa-contractor-api-dev.engine.host/services/vendor/purchase-orders';
    const partyId: string = this.configService.getPartyId();
    const companyInfo: string = this.configService.getCompanyInfo();
    const params: HttpParams = this.getClaimParams(partyId, companyInfo);
    this.httpClient.get(uri, { params }).subscribe(
      (data: any) => {
        this.getClaimsSuccessHandler(completion, claimData, data);
      },
      (error: any) => {
        this.getClaimsFailureHandler(completion, error);
      }
    );
  }

  private getClaimParams(partyId: string, companyInfo: string): HttpParams {
    return new HttpParams()
      .set('vendor_id', partyId)
      .set('company_info', companyInfo);
  }

  public getClaimsSuccessHandler(
    completion: Subject<boolean>,
    claimData: BehaviorSubject<any>,
    response: Observable<HttpResponse<any>>
  ): void {
    this.loggerService.action('Successfully obtain claim data');
    claimData.next(response);
    completion.next(true);
  }
  public getClaimsFailureHandler(
    completion: Subject<boolean>,
    errorResponse: Observable<HttpErrorResponse>
  ): void {
    this.loggerService.error('Unable to retrieve claim data');
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
}
