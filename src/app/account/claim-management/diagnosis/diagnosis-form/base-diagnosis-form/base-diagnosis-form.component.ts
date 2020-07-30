import { Subject } from 'rxjs';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-base-diagnosis-form',
  templateUrl: './base-diagnosis-form.component.html',
  styleUrls: ['./base-diagnosis-form.component.scss']
})
export class BaseDiagnosisFormComponent implements OnInit {
  @Input() public formLabel: string;
  @Input() submissionComplete$: Subject<boolean> = new Subject<boolean>();
  @Output() submitFormEmitter: EventEmitter<FormGroup> = new EventEmitter();

  public diagnosisForm: FormGroup;
  public isSubmitting: boolean = false;

  constructor(
    protected _formBuilder: FormBuilder
  ) {}

  public ngOnInit() {
    this.submissionComplete$.subscribe((complete: boolean) => {
      this.isSubmitting = !complete;
    });
  }

  public submitDiagnosisForm(): void {
    this.isSubmitting = true;
    this.submitFormEmitter.emit(this.diagnosisForm);
  }

  public isSubmitDisabled(): boolean {
    return (!this.diagnosisForm.valid || this.isSubmitting);
  }
}
