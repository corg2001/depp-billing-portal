import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DiagnosisFormFactoryAbstract } from '../../service/abstract/diagnosis.form.factory.abstract';


@Component({
  selector: 'app-tcf',
  templateUrl: './tcf.component.html',
  styleUrls: ['./tcf.component.scss']
})
export class TcfComponent implements OnInit {
  @Input() public diagnosisForm: FormGroup;

  constructor(
    protected _diagnosisFormFactory: DiagnosisFormFactoryAbstract
  ) { }

  ngOnInit() {
  }
}

