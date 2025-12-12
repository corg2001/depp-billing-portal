import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  standalone: false,
  selector: 'app-appliance-range',
  templateUrl: './appliance-range.component.html',
  styleUrls: ['./appliance-range.component.scss']
})
export class ApplianceRangeComponent implements OnInit {
  @Input() public diagnosisForm: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
