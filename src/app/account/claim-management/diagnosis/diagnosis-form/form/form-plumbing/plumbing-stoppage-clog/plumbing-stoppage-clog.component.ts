import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  standalone: false,
  selector: 'app-plumbing-stoppage-clog',
  templateUrl: './plumbing-stoppage-clog.component.html',
  styleUrls: ['./plumbing-stoppage-clog.component.scss']
})
export class PlumbingStoppageClogComponent implements OnInit {
  @Input() public diagnosisForm: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
