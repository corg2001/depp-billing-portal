import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  standalone: false,
  selector: 'app-appliance-current-unit',
  templateUrl: './appliance-current-unit.component.html',
  styleUrls: ['./appliance-current-unit.component.scss']
})
export class ApplianceCurrentUnitComponent implements OnInit {
  @Input() public diagnosisForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit() {
  }

}
