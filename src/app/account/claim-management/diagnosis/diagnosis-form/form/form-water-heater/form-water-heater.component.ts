import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { BaseDiagnosisFormComponent } from '../../base-diagnosis-form/base-diagnosis-form.component';
import { WaterHeaterUnitTypeEnum, WaterHeaterSizeEnum, WaterHeaterHighRecoveryEnum } from '../../../../model/diagnosis.enums';
import { DiagnosisFormFactoryAbstract } from '../../../../service/abstract/diagnosis.form.factory.abstract';

@Component({
  selector: 'app-form-water-heater',
  templateUrl: './form-water-heater.component.html',
  styleUrls: ['./form-water-heater.component.scss']
})
export class FormWaterHeaterComponent
extends BaseDiagnosisFormComponent
  implements OnInit {

  public keys = Object.keys;
  public waterHeaterUnitTypes = WaterHeaterUnitTypeEnum;
  public waterHeaterSizes = WaterHeaterSizeEnum;
  public waterHeaterHighRecoverys = WaterHeaterHighRecoveryEnum;

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
      currentUnitInfo: this._formBuilder.group({
        unitType: new FormControl(),
        otherDefinition: new FormControl(),
        isStandard: new FormControl(),
        isTall: new FormControl(),
        isDirectVent: new FormControl(),
        isShortLowboy: new FormControl(),
        isPowerVent: new FormControl(),
        isMobileHome: new FormControl(),
        isPowerDirectVent: new FormControl(),
        gallonSize: new FormControl(),
        highRecoveryOption: new FormControl()
      }),
      partFailureInfo: this._diagnosisFormFactory.getPartFailureFormGroup(),
      costTimeMaterialInfo: this._diagnosisFormFactory.getCostTimeMaterialFormGroup(),
      costFlatRateInfo: this._diagnosisFormFactory.getCostFlatRateFormGroup(),
      nonCoveredChargeInfo: this._diagnosisFormFactory.getNonCoveredChargeFormGroup(),
      tcfInfo: this._diagnosisFormFactory.getTCFFormGroup(),
      purchasingInfo: this._diagnosisFormFactory.getPurchasingFormGroup(),
      additionalComments: new FormControl()
    });
  }

}
