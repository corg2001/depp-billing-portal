import {
  JobStatus,
  ClaimDisposition,
  ClaimOrderType
} from '../model/claims.enums';

export interface ClaimPayloadInterface {
  readonly claim_id: string;
  readonly job_number: string;
  readonly date_assigned: string;
  readonly claim_type: ClaimOrderType;
  readonly claim_disposition: ClaimDisposition;
  readonly customer_name: string;
  readonly job_status: JobStatus;
  readonly service_address: string;
  readonly customer_contact_phone: string;
  readonly vendor_id: string;
  readonly is_prepaid_maintenance: boolean;
  readonly is_rev_share: boolean;
}
