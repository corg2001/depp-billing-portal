import {
  Component,
  Input,
  OnChanges,
  ViewChild,
  ElementRef
} from '@angular/core';
import { AchDocuments } from './model/ach-documents.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AchModalComponent } from './ach-modal/ach-modal.component';
import { OtherDocumentsModalComponent } from './other-documents-modal/other-documents-modal.component';

@Component({
  selector: 'app-ach-documents',
  templateUrl: './ach-documents.component.html',
  styleUrls: ['./ach-documents.component.scss']
})
export class AchDocumentsComponent implements OnChanges {
  @Input() public achDocs?: AchDocuments[];
  @Input() public error?: boolean;
  @Input() public completion?: boolean;
  @ViewChild('file') public file: ElementRef;
  public isData: boolean = false;
  public loading: boolean = true;
  public modalSize: 'xl';
  public noInfoText: string;
  public modalTitle: string = 'upload documents';
  public files: Set<File> = new Set();
  public progress$: any;
  public disableCloseButton: boolean;
  public showCancelButton: boolean;
  public uploading: boolean;
  public uploadSuccessful: boolean;
  public primaryButtonText: string;
  public type: string;
  constructor(
    private _modalService: NgbModal,
  ) {}

  ngOnChanges(): void {
    this.init();
  }

  public init(): void {
    this.primaryButtonText = 'Upload';
    this.noInfoText =
      `Your ACH information is not set up. Please reach out to contractor relations at 1-888-888-8888.`;
    if (this.achDocs) {
      this.achDocs.length > 0 && this.completion === true
        ? (this.isData = true)
        : (this.isData = false);
    }

    this.isloading();
  }

  public showOnlyLastFour(value: string): string {
    return value.replace(/.(?=.{4})/g, '*');
  }

  public isloading(): void {
    this.completion === true ? (this.loading = false) : (this.loading = true);
  }

  public openAchModal(): void {
    this._modalService.open(AchModalComponent);
  }

  public openOtherDocsModal(): void {
    this._modalService.open(OtherDocumentsModalComponent);
  }
}
