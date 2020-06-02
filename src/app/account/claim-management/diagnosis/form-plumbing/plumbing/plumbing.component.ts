import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-plumbing',
  templateUrl: './plumbing.component.html',
  styleUrls: ['./plumbing.component.scss']
})
export class PlumbingComponent implements OnInit {
  @Input() public diagnosisForm: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
