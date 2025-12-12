import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  standalone: false,
  selector: 'app-appliance-vent-hood',
  templateUrl: './appliance-vent-hood.component.html',
  styleUrls: ['./appliance-vent-hood.component.scss']
})
export class ApplianceVentHoodComponent implements OnInit {
  @Input() public diagnosisForm: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
