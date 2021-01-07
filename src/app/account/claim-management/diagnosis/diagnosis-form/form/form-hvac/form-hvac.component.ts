import { BaseDiagnosisFormComponent } from '../../base-diagnosis-form/base-diagnosis-form.component';
import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { DiagnosisFormFactoryAbstract } from '../../../../service/abstract/diagnosis.form.factory.abstract';
import { HvacFormFactoryAbstract } from '../../../../service/abstract/hvac.form.factory.abstract';


@Component({
  selector: 'app-form-hvac',
  templateUrl: './form-hvac.component.html',
  styleUrls: ['./form-hvac.component.scss']
})
export class FormHvacComponent extends BaseDiagnosisFormComponent implements OnInit {
  @Input() public formLabel: string;
  @ViewChild('commentsTextArea', { read: ElementRef }) textArea: ElementRef;
  public maxLength: number = 3000;
  constructor(
    protected _formBuilder: FormBuilder,
    protected _hvacFormFactory: HvacFormFactoryAbstract,
    protected _diagnosisFormFactory: DiagnosisFormFactoryAbstract
  ) {
    super(_formBuilder);
  }

  ngOnInit() {
    this.diagnosisForm = this._createForm();
  }

  private _createForm(): FormGroup {
    const partFailureGroup = this._diagnosisFormFactory.getPartFailureFormGroup();
    partFailureGroup.addControl('diagnosisOtherExplain', new FormControl());

    return this._formBuilder.group({
      currentUnitInfo: this._hvacFormFactory.getCurrentUnitFormGroup(),
      additionalSpecsInfo: this._hvacFormFactory.getAdditionalSpecsFormGroup(),
      partFailureInfo: partFailureGroup,
      costTimeMaterialInfo: this._diagnosisFormFactory.getCostTimeMaterialFormGroup(),
      costFlatRateInfo: this._diagnosisFormFactory.getCostFlatRateFormGroup(),
      nonCoveredChargeInfo: this._diagnosisFormFactory.getNonCoveredChargeFormGroup(),
      tcfInfo: this._diagnosisFormFactory.getTCFFormGroup(),
      hvacReplacementOnlyInfo: this._hvacFormFactory.getReplacementOnlyGroup(),
      additionalComments: new FormControl()
    });
  }

  public autoGrow(): void {
    const textArea: any = this.textArea.nativeElement;
    textArea.style.overflow = 'hidden';
    textArea.style.height = '0px';
    textArea.style.height = textArea.scrollHeight + 'px';
  }

}
