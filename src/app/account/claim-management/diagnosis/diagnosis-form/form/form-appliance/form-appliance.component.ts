import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { BaseDiagnosisFormComponent } from '../../base-diagnosis-form/base-diagnosis-form.component';
import { ApplianceTypeEnum } from '../../../../model/diagnosis.enums';
import { ApplianceFormFactoryAbstract } from '../../../../service/abstract/appliance.form.factory.abstract';
import { DiagnosisFormFactoryAbstract } from '../../../../service/abstract/diagnosis.form.factory.abstract';

@Component({
  standalone: false,
  selector: 'app-form-appliance',
  templateUrl: './form-appliance.component.html',
  styleUrls: ['./form-appliance.component.scss']
})
export class FormApplianceComponent
  extends BaseDiagnosisFormComponent
  implements OnInit {

  public keys = Object.keys;
  public applianceTypes = ApplianceTypeEnum;
  public selectedApplianceType: string;

  constructor(
    protected _formBuilder: FormBuilder,
    protected _applianceFormFactory: ApplianceFormFactoryAbstract,
    protected _diagnosisFormFactory: DiagnosisFormFactoryAbstract
  ) {
    super(_formBuilder);
  }

  ngOnInit() {
    this.diagnosisForm = this._createForm();
  }

  private _createForm(): FormGroup {
    return this._formBuilder.group({
      currentUnitInfo: this._applianceFormFactory.getCurrentUnitFormGroup(),
      applianceType: new FormControl(),
      applianceTypeInfo: this._formBuilder.group({
        refrigerator: this._applianceFormFactory.getRefrigeratorFormGroup(),
        dishwasher: this._applianceFormFactory.getDishwasherFormGroup(),
        range: this._applianceFormFactory.getRangeFormGroup(),
        wallOven: this._applianceFormFactory.getWallOvenFormGroup(),
        cooktop: this._applianceFormFactory.getCooktopFormGroup(),
        washer: this._applianceFormFactory.getWasherFormGroup(),
        dryer: this._applianceFormFactory.getDryerFormGroup(),
        microwave: this._applianceFormFactory.getMicrowaveFormGroup(),
        ventHood: this._applianceFormFactory.getVentHoodFormGroup(),
        other: this._applianceFormFactory.getOtherFormGroup()
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

  public selectApplianceType(selectedApplianceType: string) {
    this.selectedApplianceType = selectedApplianceType;

    this.diagnosisForm.get('applianceTypeInfo').reset();
  }

}
