import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { BaseDiagnosisFormComponent } from '../../base-diagnosis-form/base-diagnosis-form.component';
import { WellPumpSepticClaimTypeEnum } from '../../../../model/diagnosis.enums';
import { DiagnosisFormFactoryAbstract } from '../../../../service/abstract/diagnosis.form.factory.abstract';

@Component({
  standalone: false,
  selector: 'app-form-well-pump-septic',
  templateUrl: './form-well-pump-septic.component.html',
  styleUrls: ['./form-well-pump-septic.component.scss']
})
export class FormWellPumpSepticComponent
extends BaseDiagnosisFormComponent
  implements OnInit {

  public keys = Object.keys;
  public wellPumpSepticClaimTypes = WellPumpSepticClaimTypeEnum;
  public selectedClaimType: string;

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
      claimType: new FormControl(),
      claimTypeInfo: this._formBuilder.group({
        sewageEjector: this._formBuilder.group({
          horsepower: new FormControl()
        }),
        septicTankPumping: this._formBuilder.group({
          gallons: new FormControl(),
          isCertNeeded: new FormControl(),
          hasBeenPumped: new FormControl()
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

  public selectClaimType(selectedClaimType: string) {
    this.selectedClaimType = selectedClaimType;

    this.diagnosisForm.get('claimTypeInfo').reset();
  }

}
