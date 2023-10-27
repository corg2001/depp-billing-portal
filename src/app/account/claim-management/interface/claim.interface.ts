import { JobStatus, ClaimOrderType, ClaimDisposition } from '../model/claims.enums';

export interface ClaimInterface {
  readonly claimId: string;
  readonly jobNumber: string;
  readonly dateAssigned: string;
  readonly claimType: ClaimOrderType;
  readonly claimDisposition: ClaimDisposition;
  readonly customerName: string;
  readonly jobStatus: JobStatus;
  readonly serviceAddress: string;
  readonly customerContactPhone: string;
  readonly vendorId: string;
}

