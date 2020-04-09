import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, forkJoin } from 'rxjs';
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
import { AssociationEnums } from 'src/app/shared/enums/association.enums';

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
    let vendorId: string;
    const hasMultiAssociations = this._checkMultipleAssociations();
    hasMultiAssociations ? vendorId = this._getMultiAssociationsVendorId(jobNumber) : vendorId = this._configService.getVendorId();
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

  private _getMultiAssociationsVendorId(jobNumber: string): string {
    const il03_vendorId: string = localStorage.getItem(AssociationEnums.il03VendorId);
    const il04_vendorId: string = localStorage.getItem(AssociationEnums.il04VendorId);

    return jobNumber.toLowerCase().includes(AssociationEnums.il04.toLowerCase()) ? il04_vendorId : il03_vendorId;
  }

  private _checkMultipleAssociations(): boolean {
    return this._configService.hasMultiAssociations;
  }
}
