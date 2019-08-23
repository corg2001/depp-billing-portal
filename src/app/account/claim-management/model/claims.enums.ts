export enum JobStatus {
  wip = 'WIP',
  authorized = 'Authorized',
  complete = 'Complete',
  invoice = 'Invoice'
}
export enum ClaimOrderType {
  replace = 'Replace',
  repair = 'Repair',
  surge = 'Surge'
}
export enum ClaimDisposition {
  recall = 'Recall',
  cashout = 'Cashout',
  replacement = 'Replacement'
}

export enum LinkText {
  authorize = 'Authorize',
  complete = 'Complete Job',
  invoice = 'Invoice'
}
