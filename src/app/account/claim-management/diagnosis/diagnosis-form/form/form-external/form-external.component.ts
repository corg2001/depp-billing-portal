import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { BaseDiagnosisFormComponent } from '../../base-diagnosis-form/base-diagnosis-form.component';
import { ExternalClaimTypeEnum } from '../../../../model/diagnosis.enums';
import { DiagnosisFormFactoryAbstract } from '../../../../service/abstract/diagnosis.form.factory.abstract';

@Component({
  standalone: false,
  selector: 'app-form-external',
  templateUrl: './form-external.component.html',
  styleUrls: ['./form-external.component.scss']
})
export class FormExternalComponent
extends BaseDiagnosisFormComponent
  implements OnInit {

  public keys = Object.keys;
  public externalClaimTypes = ExternalClaimTypeEnum;
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
        pipeType: new FormControl(''),
        lineAge: new FormControl(''),
        isMainLine: new FormControl(''),
        isRodding: new FormControl(''),
        didRoddingWork: new FormControl(''),
        isHydroJet: new FormControl(''),
        didHydroJetWork: new FormControl(''),
        isCamera: new FormControl(''),
        didCameraWork: new FormControl(''),
        didLeakTest: new FormControl(''),
        isLeakLocated: new FormControl(''),
        leakLocation: new FormControl(''),
        isExcavation: new FormControl(''),
        excPrivateOrPublicDirt: new FormControl(''),
        excPrivateDriveway: new FormControl(''),
        excPublicStreet: new FormControl(''),
        obstacles: new FormControl('')
      }),
      partFailureInfo: this._diagnosisFormFactory.getPartFailureFormGroup(),
      costTimeMaterialInfo: this._formBuilder.group({
        leakTest: new FormControl(''),
        rodding: new FormControl(''),
        hydrojet: new FormControl(''),
        camera: new FormControl(''),
        dirtLaborMaterials: new FormControl(''),
        publicLaborMaterials: new FormControl(''),
        diagnosisSubtotal: new FormControl(''),
        spotRepairLaborMaterials: new FormControl(''),
        landscapingLaborMaterials: new FormControl(''),
        tax: new FormControl(''),
        total: new FormControl('')
      }),
      nonCoveredChargeInfo: this._diagnosisFormFactory.getNonCoveredChargeFormGroup(),
      tcfInfo: this._diagnosisFormFactory.getTCFFormGroup(),
      additionalComments: new FormControl('')
    });
  }

  public selectClaimType(selectedClaimType: string) {
    this.selectedClaimType = selectedClaimType;

    this.diagnosisForm.get('claimTypeInfo').reset();
  }
}
