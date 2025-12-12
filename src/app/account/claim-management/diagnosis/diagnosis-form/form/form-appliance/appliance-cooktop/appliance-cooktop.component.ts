import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  standalone: false,
  selector: 'app-appliance-cooktop',
  templateUrl: './appliance-cooktop.component.html',
  styleUrls: ['./appliance-cooktop.component.scss']
})
export class ApplianceCooktopComponent implements OnInit {
  @Input() public diagnosisForm: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
