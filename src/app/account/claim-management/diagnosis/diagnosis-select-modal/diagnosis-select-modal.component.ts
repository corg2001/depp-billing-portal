import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DiagnosisFormEnum } from './../../model/diagnosis.enums';

@Component({
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
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.diagnosisForm = this._createForm();
  }

  private _createForm(): FormGroup {
    return this._formBuilder.group({
      formType: new FormControl('', Validators.required)
    });
  }

  public openDiagnosisForm(form: FormGroup): void {
    this._activeModalService.close(this.diagnosisForm.get('formType').value);
  }

  public close(): void {
    this._activeModalService.close(null);
  }
}
