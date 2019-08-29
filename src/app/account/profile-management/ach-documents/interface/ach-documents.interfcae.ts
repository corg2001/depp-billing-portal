export interface AchDocumentsInterface {
  readonly accountHolderName: string;
  readonly accountNumber: string;
  readonly accountType: string;
  readonly currency: string;
  readonly routingNumber: string;
  readonly saveDetails: boolean;
  readonly walletReference?: any;
}
