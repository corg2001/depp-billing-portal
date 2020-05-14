import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-appliance-microwave',
  templateUrl: './appliance-microwave.component.html',
  styleUrls: ['./appliance-microwave.component.scss']
})
export class ApplianceMicrowaveComponent implements OnInit {
  @Input() public diagnosisForm: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
