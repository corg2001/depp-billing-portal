import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HvacTypeEnum } from '../../../../../model/diagnosis.enums';

@Component({
  standalone: false,
  selector: 'app-hvac-additional-specs',
  templateUrl: './hvac-additional-specs.component.html',
  styleUrls: ['./hvac-additional-specs.component.scss']
})
export class HvacAdditionalSpecsComponent implements OnInit {
  @Input() public diagnosisForm: FormGroup;

  public selectedHvacType: string;

  public keys = Object.keys;
  public additionalSpecsTypes = HvacTypeEnum;

  constructor() {
  }

  ngOnInit() {
  }

  public selectType(value: string) {
    this.selectedHvacType = value;
    this.diagnosisForm.get('additionalSpecsInfo').reset();
    this.diagnosisForm.get('additionalSpecsInfo').patchValue({hvacType: value});
  }
}
