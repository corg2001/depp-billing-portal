export enum JobStatus {
  wip = 'WIP',
  authorized = 'Authorized',
  completed = 'Completed',
  invoiced = 'Invoice',
  pendingAuthorization = 'PendingAuthorization'
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
  invoiced = 'Invoice'
}
