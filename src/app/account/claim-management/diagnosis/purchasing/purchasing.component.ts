import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { DiagnosisFormFactoryAbstract } from '../../service/abstract/diagnosis.form.factory.abstract';

@Component({
  selector: 'app-purchasing',
  templateUrl: './purchasing.component.html',
  styleUrls: ['./purchasing.component.scss']
})
export class PurchasingComponent implements OnInit {
  @Input() public diagnosisForm: FormGroup;

  constructor(
    protected _diagnosisFormFactory: DiagnosisFormFactoryAbstract
  ) { }

  ngOnInit() {
  }

  get items(): FormArray {
    return this.diagnosisForm.get('purchasingInfo').get('items') as FormArray;
  }

  public addItem(): void {
    this.items.push(this._diagnosisFormFactory.createPurchasingItem());
  }

  public removeItem(index: number): void {
    this.items.removeAt(index);
  }
}
