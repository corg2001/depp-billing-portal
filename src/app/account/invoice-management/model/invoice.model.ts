import { InvoiceInterface } from '../interface/invoice.interface';

export class Invoice implements InvoiceInterface {
  private _claimId: string;
  private _claimDate: string;
  private _homeOwnerName: string;
  private _serviceAddress: string;
  private _invoiceNo: string;
  private _invoiceDate: string;
  private _amount: string;
  constructor(
    claimId?: string,
    claimDate?: string,
    homeOwnername?: string,
    serviceAddress?: string,
    invoiceNo?: string,
    invoiceDate?: string,
    amount?: string
  ) {
    this._claimId = claimId;
    this._claimDate = claimDate;
    this._homeOwnerName = homeOwnername;
    this._serviceAddress = serviceAddress;
    this._invoiceNo = invoiceNo;
    this._invoiceDate = invoiceDate;
    this._amount = amount;
  }
  get claimId(): string {
    return this._claimId;
  }

  get claimDate(): string {
    return this._claimDate;
  }

  get homeOwnerName(): string {
    return this._homeOwnerName;
  }

  get serviceAddress(): string {
    return this._serviceAddress;
  }

  get invoiceNo(): string {
    return this._invoiceNo;
  }

  get invoiceDate(): string {
    return this._invoiceDate;
  }

  get amount(): string {
    return this._amount;
  }

  set claimId(claimId: string) {
    this._claimId = claimId;
  }

  set claimDate(claimDate: string) {
    this._claimDate = claimDate;
  }

  set homeOwnerName(homeOwnerName: string) {
    this._homeOwnerName = homeOwnerName;
  }

  set serviceAddress(serviceAddress: string) {
    this._serviceAddress = serviceAddress;
  }

  set invoiceNo(invoiceNo: string) {
    this._invoiceNo = invoiceNo;
  }

  set invoiceDate(invoiceDate: string) {
    this._invoiceDate = invoiceDate;
  }

  set amount(amount: string) {
    this._amount = amount;
  }
}
