import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { BaseDiagnosisFormComponent } from '../../base-diagnosis-form/base-diagnosis-form.component';
import { PlumbingClaimTypeEnum } from '../../../../model/diagnosis.enums';
import { DiagnosisFormFactoryAbstract } from '../../../../service/abstract/diagnosis.form.factory.abstract';

@Component({
  standalone: false,
  selector: 'app-form-plumbing',
  templateUrl: './form-plumbing.component.html',
  styleUrls: ['./form-plumbing.component.scss']
})
export class FormPlumbingComponent
extends BaseDiagnosisFormComponent
  implements OnInit {

  public keys = Object.keys;
  public plumbingClaimTypes = PlumbingClaimTypeEnum;
  public selectedPlumbingClaimType: string;

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
      plumbingClaimType: new FormControl(),
      plumbingClaimInfo: this._formBuilder.group({
        plumbing: this._formBuilder.group({
          location: new FormControl(),
          isAccessNeeded: new FormControl()
        }),
        garbageDisposal: this._formBuilder.group({
          horsepower: new FormControl()
        }),
        stoppageClog: this._formBuilder.group({
          location: new FormControl()
        }),
        sumpPump: this._formBuilder.group({
          horsepower: new FormControl(),
          isRainwaterOnly: new FormControl()
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

  public selectPlumbingClaimType(selectedPlumbingClaimType: string) {
    this.selectedPlumbingClaimType = selectedPlumbingClaimType;

    this.diagnosisForm.get('plumbingClaimInfo').reset();
  }

}
