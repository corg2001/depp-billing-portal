import { ClaimInterface } from '../interface/claim.interface';
import { JobStatus, ClaimOrderType, ClaimDisposition } from './claims.enums';

export class Claim implements ClaimInterface {
  private _jobId: string;
  private _date: string;
  private _claimOrderType: ClaimOrderType;
  private _claimDisposition: ClaimDisposition;
  private _name: string;
  private _jobStatus: JobStatus;
  private _address: string;
  constructor(
    jobId?: string,
    date?: string,
    claimOrderType?: ClaimOrderType,
    claimDisposition?: ClaimDisposition,
    name?: string,
    jobStatus?: JobStatus,
    address?: string
  ) {
    this._jobId = jobId;
    this._date = date;
    this._claimOrderType = claimOrderType;
    this._claimDisposition = claimDisposition;
    this._name = name;
    this._jobStatus = jobStatus;
    this._address = address;
  }
  get jobId(): string {
    return this._jobId;
  }

  get date(): string {
    return this._date;
  }

  get claimOrderType(): ClaimOrderType {
    return this._claimOrderType;
  }

  get claimDisposition(): ClaimDisposition {
      return this._claimDisposition;
  }

  get name(): string {
    return this._name;
  }

  get jobStatus(): JobStatus {
    return this._jobStatus;
  }

  get address(): string {
    return this._address;
  }

  set jobId(jobId: string) {
    this._jobId = jobId;
  }

  set date(string: string) {
    this._date = string;
  }

  set claimOrderType(claimOrderType: ClaimOrderType) {
    this._claimOrderType = claimOrderType;
  }

  set claimDisposition(claimDisposition: ClaimDisposition) {
      this._claimDisposition = claimDisposition;
  }

  set name(name: string) {
    this._name = name;
  }

  set jobStatus(jobStatus: JobStatus) {
    this._jobStatus = jobStatus;
  }

  set address(address: string) {
    this._address = address;
  }
}
