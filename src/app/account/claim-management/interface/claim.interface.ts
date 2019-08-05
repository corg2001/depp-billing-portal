import { JobStatus, ClaimOrderType, ClaimDisposition } from '../model/claims.enums';

export interface ClaimInterface {
  readonly jobId: string;
  readonly date: string;
  readonly claimOrderType: ClaimOrderType;
  readonly claimDeposition: ClaimDisposition;
  readonly name: string;
  readonly jobStatus: JobStatus;
  readonly address: string;
}

