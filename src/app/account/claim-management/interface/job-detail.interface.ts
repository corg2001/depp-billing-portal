import { CompanyInfoPayloadInterface } from 'src/app/core/interface/payload/company-info.payload.interface';

export interface JobDetailInterface {
  readonly vendorId: string;
  readonly jobNumber: string;
  readonly dateAssigned: Date;
  readonly customerContactPhone: string;
}

export class DiagnosisRequest {
  job_number: string;
  vendor_id: string;
  company_info: CompanyInfoPayloadInterface;
  contractorPhoneNumber : string;
  type: string;
  company_id: string;
  data: string;
  dateAssigned: Date;  
}
  
