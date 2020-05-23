import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-hvac-current-unit',
  templateUrl: './hvac-current-unit.component.html',
  styleUrls: ['./hvac-current-unit.component.scss']
})
export class HvacCurrentUnitComponent implements OnInit {
  @Input() public diagnosisForm: FormGroup;
  constructor() { }

  ngOnInit() {
  }

}
