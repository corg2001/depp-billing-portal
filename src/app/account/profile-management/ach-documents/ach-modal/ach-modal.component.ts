import { Component, OnInit, ElementRef, ViewChildren, ViewChild } from '@angular/core';
import { forkJoin } from 'rxjs';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AchDocumetsService } from '../service/ach-documents.service';
import { ConfigService } from 'src/app/core/config.service';

@Component({
  selector: 'app-ach-modal',
  templateUrl: './ach-modal.component.html',
  styleUrls: ['./ach-modal.component.scss']
})
export class AchModalComponent implements OnInit {
  @ViewChild('file') public file: ElementRef;
  public loading: boolean;
  public modalSize: 'xl';

  public modalTitle: string = 'upload documents';
  public files: Set<File> = new Set();
  public progress$: any;
  public disableCloseButton: boolean;
  public showCancelButton: boolean;
  public uploading: boolean;
  public uploadSuccessful: boolean;
  public primaryButtonText: string;
  public value: string;
  public browseButtonText: string;

  constructor(
    private _modalService: NgbModal,
    private _modalConfig: NgbModalConfig,
    private _achDocsService: AchDocumetsService,
    private _configService: ConfigService) { }

  ngOnInit() {
    this.browseButtonText = 'Browse for files';
  }


  public openModal(): void {
   this._modalService.open(this);
  }

  public close(): void {
    this._modalService.dismissAll();
  }

  public onFilesAdded(event: any): void {

    const files: { [key: string]: File } = event.target.files;

    for (const key in files) {
      // tslint:disable-next-line: radix
      if (!isNaN(parseInt(key))) {
        this.files.add(files[key]);
        this.closeModal();
      }
    }
  }

  public addFiles() {
    this.file.nativeElement.click();

  }

  public closeModal(): void {
    const vendorId: string = this._configService.getVendorId();
    const companyInfo: string = this._configService.getCompanyInfo();
    this._modalConfig.backdrop = 'static';
    this.disableCloseButton = true;
    this._modalConfig.keyboard = false;
    this.uploading = true;

    this.progress$ = this._achDocsService.upload(this.files, vendorId, companyInfo);

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
      this.uploadSuccessful = true;
      this.loading = false;
    });
  }

  

}
