import {
  Component,
  Input,
  OnChanges,
  ViewChild,
  ElementRef
} from '@angular/core';
import { environment } from 'src/environments/environment';
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
  @ViewChild('file', { static: false }) public file: ElementRef;
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
  public achFormPath: string;
  public achFormTitle: string;
  constructor(private _modalService: NgbModal) {}

  ngOnChanges(): void {
    this.init();
  }

  public init(): void {
    this.achFormPath = environment.forms.ach_form_path;
    this.achFormTitle = 'ACH Form';
    this.primaryButtonText = 'Upload';
    this.noInfoText = `Your ACH information is not set up. Please reach out to contractor relations at ${environment.core.customerServiceNumber}`;
    if (this.achDocs) {
      this.achDocs.length > 0 && this.completion === true
        ? (this.isData = true)
        : (this.isData = false);
    }

    this.isloading();
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
