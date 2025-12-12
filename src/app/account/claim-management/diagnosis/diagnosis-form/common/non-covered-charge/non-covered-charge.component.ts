import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { DiagnosisFormFactoryAbstract } from '../../../../service/abstract/diagnosis.form.factory.abstract';

@Component({
  standalone: false,
  selector: 'app-non-covered-charge',
  templateUrl: './non-covered-charge.component.html',
  styleUrls: ['./non-covered-charge.component.scss']
})
export class NonCoveredChargeComponent implements OnInit {
  @Input() public diagnosisForm: FormGroup;

  constructor(
    protected _diagnosisFormFactory: DiagnosisFormFactoryAbstract
  ) { }

  ngOnInit() {
  }

  get items(): FormArray {
    return this.diagnosisForm.get('nonCoveredChargeInfo').get('items') as FormArray;
  }

  public addItem(): void {
    this.items.push(this._diagnosisFormFactory.createNonCoveredChargeItem());
  }

  public removeItem(index: number): void {
    this.items.removeAt(index);
  }
}
