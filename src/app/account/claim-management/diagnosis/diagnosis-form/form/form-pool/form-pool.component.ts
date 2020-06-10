import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { BaseDiagnosisFormComponent } from '../../base-diagnosis-form/base-diagnosis-form.component';
import { PoolClaimTypeEnum } from '../../../../model/diagnosis.enums';
import { DiagnosisFormFactoryAbstract } from '../../../../service/abstract/diagnosis.form.factory.abstract';

@Component({
  selector: 'app-form-pool',
  templateUrl: './form-pool.component.html',
  styleUrls: ['./form-pool.component.scss']
})
export class FormPoolComponent
extends BaseDiagnosisFormComponent
  implements OnInit {

  public keys = Object.keys;
  public poolClaimTypes = PoolClaimTypeEnum;
  public selectedPoolClaimType: string;

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
      poolClaimType: new FormControl(),
      poolClaimInfo: this._formBuilder.group({
        poolSpa: this._formBuilder.group({
          isEquipmentShared: new FormControl(),
          isBuiltInOrFreestanding: new FormControl()
        })
      }),
      partFailureInfo: this._diagnosisFormFactory.getPartFailureFormGroup(),
      costTimeMaterialInfo: this._diagnosisFormFactory.getCostTimeMaterialFormGroup(),
      costFlatRateInfo: this._diagnosisFormFactory.getCostFlatRateFormGroup(),
      nonCoveredChargeInfo: this._diagnosisFormFactory.getNonCoveredChargeFormGroup(),
      tcfInfo: this._diagnosisFormFactory.getTCFFormGroup(),
      additionalComments: new FormControl()
    });
  }

  public selectPoolClaimType(selectedPoolClaimType: string) {
    this.selectedPoolClaimType = selectedPoolClaimType;

    this.diagnosisForm.get('poolClaimInfo').reset();
  }

}
