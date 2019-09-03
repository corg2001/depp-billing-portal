import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { AchDocuments } from './model/ach-documents.model';

@Component({
  selector: 'app-ach-documents',
  templateUrl: './ach-documents.component.html',
  styleUrls: ['./ach-documents.component.scss']
})
export class AchDocumentsComponent implements OnChanges {
  @Input() public achDocs?: AchDocuments[];
  @Input() public error?: boolean;
  @Input() public completion?: boolean;
  public isData: boolean = false;
  public loading = true;
  public noInfoText: string;

  constructor() {}

  ngOnChanges(): void {
    this.init();
  }

  public init(): void {
    this.noInfoText =
      'Your ACH information is not set up. Please reach out to contractor relations at 1-888-888-8888.';
    if (this.achDocs) {
      this.achDocs.length > 0 && this.completion === true ? (this.isData = true) : (this.isData = false);
    }
    this.isloading();
  }

  public showOnlyLastFour(value: string): string {
    return value.replace(/.(?=.{4})/g, '*');
  }

  public isloading(): void {
    this.completion === true ? (this.loading = false) : (this.loading = true);
  }
}
