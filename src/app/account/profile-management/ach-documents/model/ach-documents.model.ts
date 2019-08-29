import { AchDocumentsInterface } from '../interface/ach-documents.interfcae';

export class AchDocuments implements AchDocumentsInterface {
  private _accountHolderName: string;
  private _accountNumber: string;
  private _accountType: string;
  private _currency: string;
  private _routingNumber: string;
  private _saveDetails: boolean;
  private _walletReference?: any;

  constructor(
    accountHolderName: string,
    accountNumber: string,
    accountType: string,
    currency: string,
    routingNumber: string,
    saveDetails: boolean,
    walletReference?: any
  ) {
    this._accountHolderName = accountHolderName;
    this._accountNumber = accountNumber;
    this._accountType = accountType;
    this._currency = currency;
    this._routingNumber = routingNumber;
    this._saveDetails = saveDetails;
    this._walletReference = walletReference;
  }

  public get accountHolderName(): string {
    return this._accountHolderName;
  }

  public get accountNumber(): string {
    return this._accountNumber;
  }

  public get accountType(): string {
      return this._accountType;
  }

  public get currency(): string {
      return this._currency;
  }

  public get routingNumber(): string {
      return  this._routingNumber;
  }

  public get saveDetails(): boolean {
      return this._saveDetails;
  }

  public get walletReference(): any {
      return this._walletReference;
  }

  public set accountHolderName(newValue: string) {
      this._accountHolderName = newValue;
  }

  public set accountNumber(newValue: string) {
      this._accountNumber = newValue;
  }

  public set accountType(newValue: string) {
      this._accountType = newValue;
  }

  public set currency(newValue: string) {
      this.currency = newValue;
  }

  public set routingNumber(newValue: string) {
      this._routingNumber = newValue;
  }

  public set saveDetails(newvalue: boolean) {
      this._saveDetails = newvalue;
  }

  public set walletReference(newValue: any) {
      this._walletReference = newValue;
  }
}
