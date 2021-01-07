import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { DiagnosisFormFactoryAbstract } from '../../../../service/abstract/diagnosis.form.factory.abstract';
import { FailureCauseEnum } from '../../../../model/diagnosis.enums';

@Component({
  selector: 'app-part-failure',
  templateUrl: './part-failure.component.html',
  styleUrls: ['./part-failure.component.scss']
})
export class PartFailureComponent implements OnInit {
  @Input() public diagnosisForm: FormGroup;
  @ViewChild('commentsTextArea', { read: ElementRef }) textArea: ElementRef;
  public maxLength: number = 3000;
  public keys = Object.keys;
  public failureCauses = FailureCauseEnum;

  constructor(
    protected _diagnosisFormFactory: DiagnosisFormFactoryAbstract
  ) { }

  ngOnInit() {
    console.log(this.diagnosisForm.controls.partFailureInfo)
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

  public autoGrow(): void {
    const textArea: any = this.textArea.nativeElement;
    textArea.style.overflow = 'hidden';
    textArea.style.height = '0px';
    textArea.style.height = textArea.scrollHeight + 'px';
  }
}
