import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-pool-spa',
  templateUrl: './pool-spa.component.html',
  styleUrls: ['./pool-spa.component.scss']
})
export class PoolSpaComponent implements OnInit {
  @Input() public diagnosisForm: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
