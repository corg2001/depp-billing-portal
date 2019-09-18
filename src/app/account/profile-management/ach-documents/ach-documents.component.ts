import {
  Component,
  Input,
  OnChanges,
  ViewChild,
  ElementRef
} from '@angular/core';
import { AchDocuments } from './model/ach-documents.model';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfigService } from 'src/app/core/config.service';
import * as moment from 'moment';
import * as dateFormat from 'dateformat';
import { AchDocumetsService } from './service/ach-documents.service';
import { forkJoin } from 'rxjs';
import { AchModalComponent } from './ach-modal/ach-modal.component';

@Component({
  selector: 'app-ach-documents',
  templateUrl: './ach-documents.component.html',
  styleUrls: ['./ach-documents.component.scss']
})
export class AchDocumentsComponent implements OnChanges {
  @Input() public achDocs?: AchDocuments[];
  @Input() public error?: boolean;
  @Input() public completion?: boolean;
  @ViewChild('modalHtml') public modalHtml: ElementRef;
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

  constructor(
    private _modalService: NgbModal,
    private _modalConfig: NgbModalConfig,
    private _achDocsService: AchDocumetsService,
    private _configService: ConfigService
  ) {}

  ngOnChanges(): void {
    this.init();
  }

  public init(): void {
    this.primaryButtonText = 'Upload';
    this.noInfoText =
      'Your ACH information is not set up. Please reach out to contractor relations at 1-888-888-8888.';
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

  public openModal(): void {
    this._modalService.open(AchModalComponent);
    // console.log(this._modalConfig.backdrop);
    // this.closeModal();
  }

  public onFilesAdded(): void {

    const files: { [key: string]: File } = this.file.nativeElement.files;

    for (const key in files) {
      // tslint:disable-next-line: radix
      if (!isNaN(parseInt(key))) {
        this.files.add(files[key]);
      }
    }
   
  }

  public addFiles() {
  }

  public closeModal(): void {
    if (this.uploadSuccessful) {
      this._modalService.dismissAll();
    }
  
    const vendorId: string = this._configService.getVendorId();
    const companyInfo: string = this._configService.getVendorId();
    this._keepModalOpen(true);
    this.disableCloseButton = true;
    this.uploading = true;

    this.progress$ = this._achDocsService.upload(this.files, vendorId, companyInfo);
    console.log(this.progress$);

    // convert the progress map into an array
    const allProgressObservables: any[] = [];

    // tslint:disable-next-line: forin
    for (const key in this.progress$) {
      allProgressObservables.push(this.progress$[key].progress);
    }

    this.primaryButtonText = 'Finish';

    // Adjust the state variable

    // The Ok-button show have the text 'Finish'

    // The dialog should not be close while loadin
    this.showCancelButton = false;

    forkJoin(allProgressObservables).subscribe((end: any) => {
      console.log('done');
      this.disableCloseButton = false;
      this._keepModalOpen(false);
      this.uploadSuccessful = true;
      this.loading = false;
    });
  }

  private _keepModalOpen(value: boolean): void {
    value ? this._modalConfig.backdrop = 'static' : this._modalConfig.backdrop = true;
    value ? this._modalConfig.keyboard = false : this._modalConfig.keyboard = true;
  }
}
