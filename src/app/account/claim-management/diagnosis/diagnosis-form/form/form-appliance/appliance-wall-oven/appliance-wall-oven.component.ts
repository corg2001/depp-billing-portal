import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  standalone: false,
  selector: 'app-appliance-wall-oven',
  templateUrl: './appliance-wall-oven.component.html',
  styleUrls: ['./appliance-wall-oven.component.scss']
})
export class ApplianceWallOvenComponent implements OnInit {
  @Input() public diagnosisForm: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
