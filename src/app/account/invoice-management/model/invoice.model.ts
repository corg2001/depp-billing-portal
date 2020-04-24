import { InvoiceInterface } from '../interface/invoice.interface';
import { InvoicPaymentStatusEnum } from './enums/invoice-payment-status.enum';

export class Invoice implements InvoiceInterface {
  private _claimId: string;
  private _claimDate: string;
  private _homeOwnerName: string;
  private _serviceAddress: string;
  private _invoiceNo: string;
  private _invoiceDate: string;
  private _amount: string;
  private _invoicePaymentStatus: InvoicPaymentStatusEnum;
  constructor(
    claimId?: string,
    claimDate?: string,
    homeOwnername?: string,
    serviceAddress?: string,
    invoiceNo?: string,
    invoiceDate?: string,
    amount?: string,
    invoicePaymentStatus?: InvoicPaymentStatusEnum
  ) {
    this._claimId = claimId;
    this._claimDate = claimDate;
    this._homeOwnerName = homeOwnername;
    this._serviceAddress = serviceAddress;
    this._invoiceNo = invoiceNo;
    this._invoiceDate = invoiceDate;
    this._amount = amount;
    this._invoicePaymentStatus = invoicePaymentStatus;
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

  get invoicePaymentStatus(): InvoicPaymentStatusEnum {
    return this._invoicePaymentStatus;
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

  set invoicePaymentStatus(status: InvoicPaymentStatusEnum) {
    this._invoicePaymentStatus = status;
  }
}
