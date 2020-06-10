import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-appliance-other',
  templateUrl: './appliance-other.component.html',
  styleUrls: ['./appliance-other.component.scss']
})
export class ApplianceOtherComponent implements OnInit {
  @Input() public diagnosisForm: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
