import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { DiagnosisFormFactoryAbstract } from '../../../../service/abstract/diagnosis.form.factory.abstract';

@Component({
  standalone: false,
  selector: 'app-cost-flat-rate',
  templateUrl: './cost-flat-rate.component.html',
  styleUrls: ['./cost-flat-rate.component.scss']
})
export class CostFlatRateComponent implements OnInit {
  @Input() public diagnosisForm: FormGroup;

  constructor(
    protected _diagnosisFormFactory: DiagnosisFormFactoryAbstract
  ) { }

  ngOnInit() {
  }

  get items(): FormArray {
    return this.diagnosisForm.get('costFlatRateInfo').get('items') as FormArray;
  }

  public addItem(): void {
    this.items.push(this._diagnosisFormFactory.createCostFlatRateItem());
  }

  public removeItem(index: number): void {
    this.items.removeAt(index);
  }
}
