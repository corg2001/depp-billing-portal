import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-appliance-dishwasher',
  templateUrl: './appliance-dishwasher.component.html',
  styleUrls: ['./appliance-dishwasher.component.scss']
})
export class ApplianceDishwasherComponent implements OnInit {
  @Input() public diagnosisForm: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
