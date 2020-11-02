import { Injectable } from '@angular/core';
import {
  ClaimPayloadInterface
} from '../../interface/claim.payload.interface';
import { Claim } from '../../model/claims.model';

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
        claimPlayload.date_assigned,
        claimPlayload.claim_type,
        claimPlayload.claim_disposition,
        claimPlayload.customer_name,
        claimPlayload.job_status,
        this.removeEnterKeys(claimPlayload.service_address),
        claimPlayload.customer_contact_phone,
        claimPlayload.vendor_id,
        claimPlayload.is_prepaid_maintenance,
        claimPlayload.is_rev_share
      );
      claims.push(claim);
    });
    return claims;
  }
  public removeEnterKeys(message: string): string {
    return message.replace(/(\r\n|\n|\r)/gm, '');
  }
}
