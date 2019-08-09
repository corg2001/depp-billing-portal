import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Claim } from './model/claims.model';
import {
  JobStatus,
  ClaimOrderType,
  ClaimDisposition
} from './model/claims.enums';

import { Observable, Subject} from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpParams, HttpResponse } from '@angular/common/http';
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
  ) {
    this._claims = [
      new Claim(
        '23456921',
        'xx-xx-xxxxx',
        ClaimOrderType.replace,
        ClaimDisposition.replacement,
        'Kevin Johnson',
        JobStatus.inProgress,
        '301 Miracle Way, Phoenix AZ, 478963'
      ),
      new Claim(
        '54789979',
        'xx-xx-xxxxx',
        ClaimOrderType.replace,
        ClaimDisposition.replacement,
        'Lenny Joesph',
        JobStatus.needsAuth,
        '113 Gray St, Houston TX, 77379'
      ),
      new Claim(
        '89741365',
        'xx-xx-xxxxx',
        ClaimOrderType.repair,
        ClaimDisposition.recall,
        'John Doe',
        JobStatus.inProgress,
        '301 Smith St, Houston TX, 77379'
      ),
      new Claim(
        '21458742',
        'xx-xx-xxxxx',
        ClaimOrderType.surge,
        ClaimDisposition.cashout,
        'Mark Jackson',
        JobStatus.needsAuth,
        '2309 Joy St, Los Angelos CA, 21571'
      ),
      new Claim(
        '96582341',
        'xx-xx-xxxxx',
        ClaimOrderType.replace,
        ClaimDisposition.replacement,
        'Mary Jane',
        JobStatus.inProgress,
        '301 Smith St, Houston TX, 77379'
      ),
      new Claim(
        '36251478',
        'xx-xx-xxxxx',
        ClaimOrderType.replace,
        ClaimDisposition.replacement,
        'John Doe',
        JobStatus.inProgress,
        '7404 Ten Curves St, Houston TX, 77379'
      ),
      new Claim(
        '2587419',
        'xx-xx-xxxxx',
        ClaimOrderType.surge,
        ClaimDisposition.cashout,
        'Lisa Willis',
        JobStatus.inProgress,
        '257 Autumn Way, Detroit MI, 33254'
      )
    ];
    this.claims$ = new BehaviorSubject(this._claims);
  }

  public getClaims(completion: Subject<boolean>, claimData: Subject<any>): void {
    const uri: string  = 'https://unify-hwa-contractor-api-dev.engine.host/services/vendor/purchase-orders';
    const partyId: string = this.configService.getPartyId();
    const companyInfo: string = this.configService.getCompanyInfo();
    const params: HttpParams = this.getClaimParams(partyId, companyInfo);
    this.httpClient.get(uri, {params}).subscribe(
      (data: any) => { this.getClaimsSuccessHandler(completion, claimData, data); },
      (error: any ) => { this.getClaimsFailureHandler(completion, error); }
    );
  }

  private getClaimParams(partyId: string, companyInfo: string): HttpParams {
    return new HttpParams().set('vendor_id', partyId).set('company_info', companyInfo);
  }

  public getClaimsSuccessHandler(
    completion: Subject<boolean>,
    claimData: Subject<any>,
    response: Observable<HttpResponse<any>>
  ): void {
    this.loggerService.action('Successfully obtain claim data');
    claimData.next(response);
    completion.next(true);
  }
  public getClaimsFailureHandler(completion: Subject<boolean>, errorResponse: Observable<HttpErrorResponse>): void {
    this.loggerService.error('Unable to retrieve claim data');
    completion.next(false);
  }

  public search(name?: string, jobId?: string, address?: string): void {
    this.claims$.next(
      this._claims.filter((claim: Claim) => {
        const nameInput = name.toLowerCase();
        const jobIdInput = jobId.toLowerCase();
        const addressInput = address.toLowerCase();
        return name
          ? claim.name.toLowerCase().includes(nameInput)
          : jobId
          ? claim.jobId.toLowerCase().includes(jobIdInput)
          : address
          ? claim.address.toLowerCase().includes(addressInput)
          : {};
      })
    );
  }
}
