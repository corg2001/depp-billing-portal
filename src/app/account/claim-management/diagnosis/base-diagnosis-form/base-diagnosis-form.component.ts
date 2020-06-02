import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-base-diagnosis-form',
  templateUrl: './base-diagnosis-form.component.html',
  styleUrls: ['./base-diagnosis-form.component.scss']
})
export class BaseDiagnosisFormComponent {
  @Input() public formLabel: string;
  @Output() submitFormEmitter: EventEmitter<FormGroup> = new EventEmitter();

  public diagnosisForm: FormGroup;

  constructor(protected _formBuilder: FormBuilder) {}

  public submitDiagnosisForm() {
    this.submitFormEmitter.emit(this.diagnosisForm);
    this.diagnosisForm.markAsPristine();
  }
}
