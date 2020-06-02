import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { BaseDiagnosisFormComponent } from '../../base-diagnosis-form/base-diagnosis-form.component';
import { DiagnosisFormFactoryAbstract } from '../../../../service/abstract/diagnosis.form.factory.abstract';

@Component({
  selector: 'app-form-electrical',
  templateUrl: './form-electrical.component.html',
  styleUrls: ['./form-electrical.component.scss']
})
export class FormElectricalComponent
extends BaseDiagnosisFormComponent
  implements OnInit {

  constructor(
    protected _formBuilder: FormBuilder,
    protected _diagnosisFormFactory: DiagnosisFormFactoryAbstract
  ) {
    super(_formBuilder);
  }

  ngOnInit() {
    this.diagnosisForm = this._createForm();
  }

  private _createForm(): FormGroup {
    return this._formBuilder.group({
      partFailureInfo: this._diagnosisFormFactory.getPartFailureFormGroup(),
      costTimeMaterialInfo: this._diagnosisFormFactory.getCostTimeMaterialFormGroup(),
      costFlatRateInfo: this._diagnosisFormFactory.getCostFlatRateFormGroup(),
      nonCoveredChargeInfo: this._diagnosisFormFactory.getNonCoveredChargeFormGroup(),
      tcfInfo: this._diagnosisFormFactory.getTCFFormGroup(),
      additionalComments: new FormControl()
    });
  }

}
