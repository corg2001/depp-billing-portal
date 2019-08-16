import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {
  public helpFormGroup: FormGroup;
  public states = [
    'Alabama',
    'Arizona',
    'Arakansas',
    'Delaware',
    'Tennessee',
    'Texas',
    'Washington'
  ];
  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.helpFormGroup = this._formBuilder.group({
      name: [''],
      email: [''],
      phoneNumber: [''],
      phoneType: [''],
      city: [''],
      state: [''],
      content: [''],
      preferredMethod: ['']
    });
  }
  sendHelpContent() {
    // service code
    console.log(this.helpFormGroup.value);
  }
}
