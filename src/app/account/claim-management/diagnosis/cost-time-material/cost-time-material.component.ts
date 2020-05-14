import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { DiagnosisFormFactoryAbstract } from '../../service/abstract/diagnosis.form.factory.abstract';

@Component({
  selector: 'app-cost-time-material',
  templateUrl: './cost-time-material.component.html',
  styleUrls: ['./cost-time-material.component.scss']
})
export class CostTimeMaterialComponent implements OnInit {
  @Input() public diagnosisForm: FormGroup;

  constructor(
    protected _diagnosisFormFactory: DiagnosisFormFactoryAbstract
  ) { }

  ngOnInit() {
  }

  get items(): FormArray {
    return this.diagnosisForm.get('costTimeMaterialInfo').get('items') as FormArray;
  }

  public addItem(): void {
    this.items.push(this._diagnosisFormFactory.createCostTimeMaterialItem());
  }

  public removeItem(index: number): void {
    this.items.removeAt(index);
  }
}
