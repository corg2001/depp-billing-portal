import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  standalone: false,
  selector: 'app-plumbing-sump-pump',
  templateUrl: './plumbing-sump-pump.component.html',
  styleUrls: ['./plumbing-sump-pump.component.scss']
})
export class PlumbingSumpPumpComponent implements OnInit {
  @Input() public diagnosisForm: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
