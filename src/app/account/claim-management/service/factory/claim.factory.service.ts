import { Injectable } from '@angular/core';
import {
  ClaimPayloadInterface
} from '../../interface/claim.payload.interface';
import { Claim } from '../../model/claims.model';
import { ClaimInterface } from '../../interface/claim.interface';

@Injectable({
  providedIn: 'root'
})
export class ClaimFactoryService {
  constructor() {}

  public getClaimFromPayload(claim_playload: ClaimPayloadInterface[]): Claim[] {
    const claims: Claim[] = [];
    claim_playload.forEach((claimPlayload: ClaimPayloadInterface) => {
      const claim: Claim = new Claim(
        claimPlayload.job_number,
        claimPlayload.date_requested,
        claimPlayload.claim_type,
        claimPlayload.claim_disposition,
        claimPlayload.customer_name,
        claimPlayload.job_status,
        claimPlayload.service_address
      );
      claims.push(claim);
    });
    return claims;
  }
}
