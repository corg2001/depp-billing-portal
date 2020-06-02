import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { HvacReplacementEnum } from '../../../../../model/diagnosis.enums';
import { HvacFormFactoryAbstract } from '../../../../../service/abstract/hvac.form.factory.abstract';

@Component({
  selector: 'app-hvac-replacement-only',
  templateUrl: './hvac-replacement-only.component.html',
  styleUrls: ['./hvac-replacement-only.component.scss']
})
export class HvacReplacementOnlyComponent implements OnInit {
  @Input() public diagnosisForm: FormGroup;

  public keys = Object.keys;
  public additionalSpecsTypes = HvacReplacementEnum;

  constructor(
    protected _hvacFormFactory: HvacFormFactoryAbstract
  ) {}

  ngOnInit() {
  }

  get items(): FormArray {
    return this.diagnosisForm.get('hvacReplacementOnlyInfo').get('items') as FormArray;
  }

  public selectType(value: string, index: number) {
    const controlAtIndex = this.items.at(index) as FormGroup;
    controlAtIndex.reset();
    controlAtIndex.patchValue({replacementType: value});
  }

  public addItem(): void {
    this.items.push(this._hvacFormFactory.createReplacementOnlyItem());
  }

  public removeItem(index: number): void {
    this.items.removeAt(index);
  }
}
