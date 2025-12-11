import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  standalone: false,
  selector: 'app-appliance-washer',
  templateUrl: './appliance-washer.component.html',
  styleUrls: ['./appliance-washer.component.scss']
})
export class ApplianceWasherComponent implements OnInit {
  @Input() public diagnosisForm: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
