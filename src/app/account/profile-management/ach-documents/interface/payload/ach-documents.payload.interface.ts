export interface AchDocumentsPayloadInterface {
  readonly account_holder_name: string;
  readonly account_number: string;
  readonly account_type: string;
  readonly currency: string;
  readonly routing_number: string;
  readonly save_details: boolean;
  readonly wallet_reference?: any;
}
