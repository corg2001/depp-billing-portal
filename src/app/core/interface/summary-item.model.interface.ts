import { SafeHtml } from '@angular/platform-browser';

export interface SummaryItemInterface {
  readonly title: string;
  readonly details: SafeHtml;
}
