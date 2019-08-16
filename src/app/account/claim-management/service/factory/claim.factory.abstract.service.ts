import { Injectable } from '@angular/core';
import { ClaimPayloadInterface } from '../../interface/claim.payload.interface';
import { Claim } from '../../model/claims.model';

@Injectable({
  providedIn: 'root'
})
export abstract class ClaimFactoryServiceAbstract {

  constructor() { }

  abstract getClaimFromPayload(claim_playload: ClaimPayloadInterface[]): Claim[];

}
