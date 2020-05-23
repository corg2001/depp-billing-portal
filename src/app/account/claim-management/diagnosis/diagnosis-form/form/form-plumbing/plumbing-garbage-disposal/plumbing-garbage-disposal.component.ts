import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-plumbing-garbage-disposal',
  templateUrl: './plumbing-garbage-disposal.component.html',
  styleUrls: ['./plumbing-garbage-disposal.component.scss']
})
export class PlumbingGarbageDisposalComponent implements OnInit {
  @Input() public diagnosisForm: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
