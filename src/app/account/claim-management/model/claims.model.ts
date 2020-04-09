import { ClaimInterface } from '../interface/claim.interface';
import { JobStatus, ClaimOrderType, ClaimDisposition } from './claims.enums';

export class Claim implements ClaimInterface {
  private _jobNumber: string;
  private _dateRequested: string;
  private _claimType: ClaimOrderType;
  private _claimDisposition: ClaimDisposition;
  private _customerName: string;
  private _jobStatus: JobStatus;
  private _serviceAddress: string;
  private _customerContactPhone: string;
  constructor(
    jobNumber?: string,
    dateRequested?: string,
    claimType?: ClaimOrderType,
    claimDisposition?: ClaimDisposition,
    customerName?: string,
    jobStatus?: JobStatus,
    serviceAddress?: string,
    customerContactPhone?: string
  ) {
    this._jobNumber = jobNumber;
    this._dateRequested = dateRequested;
    this._claimType = claimType;
    this._claimDisposition = claimDisposition;
    this._customerName = customerName;
    this._jobStatus = jobStatus;
    this._serviceAddress = serviceAddress;
    this._customerContactPhone = customerContactPhone;
  }
  get jobNumber(): string {
    return this._jobNumber;
  }

  get dateRequested(): string {
    return this._dateRequested;
  }

  get claimType(): ClaimOrderType {
    return this._claimType;
  }

  get claimDisposition(): ClaimDisposition {
      return this._claimDisposition;
  }

  get customerName(): string {
    return this._customerName;
  }

  get jobStatus(): JobStatus {
    return this._jobStatus;
  }

  get serviceAddress(): string {
    return this._serviceAddress;
  }

  get customerContactPhone(): string {
    return this._customerContactPhone;
  }

  set jobNumber(jobNumber: string) {
    this._jobNumber = jobNumber;
  }

  set dateRequested(dateRequested: string) {
    this._dateRequested = dateRequested;
  }

  set claimType(claimType: ClaimOrderType) {
    this._claimType = claimType;
  }

  set claimDisposition(claimDisposition: ClaimDisposition) {
      this._claimDisposition = claimDisposition;
  }

  set customerName(name: string) {
    this._customerName = name;
  }

  set jobStatus(jobStatus: JobStatus) {
    this._jobStatus = jobStatus;
  }

  set serviceAddress(serviceAddress: string) {
    this._serviceAddress = serviceAddress;
  }

  set customerContactPhone(customerContactPhone: string) {
    this._customerContactPhone = customerContactPhone;
  }
}
