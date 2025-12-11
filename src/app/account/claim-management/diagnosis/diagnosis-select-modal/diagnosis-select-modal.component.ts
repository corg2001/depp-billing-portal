import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DiagnosisFormEnum } from './../../model/diagnosis.enums';
import { DiagnosisDisableModalComponent } from '../../diagnosis/diagnosis-disable-modal/diagnosis-disable-modal.component';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
@Component({
  standalone: false,
  selector: 'app-diagnosis-select-modal',
  templateUrl: './diagnosis-select-modal.component.html',
  styleUrls: ['./diagnosis-select-modal.component.scss']
})
export class DiagnosisSelectModalComponent implements OnInit {

  public diagnosisForm: FormGroup;

  public keys = Object.keys;
  public diagnosisFormTypes = DiagnosisFormEnum;

  constructor(
    private _activeModalService: NgbActiveModal,
    private _formBuilder: FormBuilder,
    private _modalService: NgbModal,
  ) { }

  ngOnInit() {
    this.diagnosisForm = this._createForm();
  }

  private _createForm(): FormGroup {
    return this._formBuilder.group({
      formType: new FormControl('', Validators.required)
    });
  }

  public openDiagnosisForm(): void {

    if (this.isDiagnosisFormEnabled()) {
      this._activeModalService.close(this.diagnosisForm.get('formType').value);
      return;
    }
    this._modalService.open(DiagnosisDisableModalComponent, { centered: true });
  }

  public close(): void {
    this._activeModalService.close(null);
  }

  public isDiagnosisFormEnabled(): boolean {
    return false;
  }
}
