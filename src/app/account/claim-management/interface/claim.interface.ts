import { JobStatus, ClaimOrderType, ClaimDisposition } from '../model/claims.enums';

export interface ClaimInterface {
  readonly jobNumber: string;
  readonly dateRequested: string;
  readonly claimType: ClaimOrderType;
  readonly claimDisposition: ClaimDisposition;
  readonly customerName: string;
  readonly jobStatus: JobStatus;
  readonly serviceAddress: string;
  readonly customerContactPhone: string;
  readonly vendorId: string;
}

