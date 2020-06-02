import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { DiagnosisFormFactoryAbstract } from '../../service/abstract/diagnosis.form.factory.abstract';
import { FailureCauseEnum } from './../../model/diagnosis.enums';

@Component({
  selector: 'app-part-failure',
  templateUrl: './part-failure.component.html',
  styleUrls: ['./part-failure.component.scss']
})
export class PartFailureComponent implements OnInit {
  @Input() public diagnosisForm: FormGroup;

  public keys = Object.keys;
  public failureCauses = FailureCauseEnum;

  constructor(
    protected _diagnosisFormFactory: DiagnosisFormFactoryAbstract
  ) { }

  ngOnInit() {
  }

  get items(): FormArray {
    return this.diagnosisForm.get('partFailureInfo').get('items') as FormArray;
  }

  public addPartFailure(): void {
    this.items.push(this._diagnosisFormFactory.createPartFailureItem());
  }

  public removeItem(index: number): void {
    this.items.removeAt(index);
  }
}
