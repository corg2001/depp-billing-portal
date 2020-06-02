import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-appliance-dryer',
  templateUrl: './appliance-dryer.component.html',
  styleUrls: ['./appliance-dryer.component.scss']
})
export class ApplianceDryerComponent implements OnInit {
  @Input() public diagnosisForm: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
