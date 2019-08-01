import { Component, OnInit } from '@angular/core';
import { States } from './us-states.enum';
import { TimeToCall } from './time-to-call.enum';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-enroll',
  templateUrl: './enroll.component.html',
  styleUrls: ['./enroll.component.scss']
})
  export class EnrollComponent implements OnInit {
  public enrollForm: FormGroup;
  public completionSubject: Subject<boolean> = new Subject<boolean>();
  public listOfStates: any[] = [];
  public timeToCallOptions: any = [];
  public showConfirmationMessage: boolean = false;

  constructor() { }

  ngOnInit() {
    this.completionSubject.subscribe(this.responseHandler.bind(this));
    this.buildForm();
    this.listOfStates = this.enumToArray(States);
    this.timeToCallOptions = this.enumToArray(TimeToCall);

  }

  private buildForm(): void {
    const firstName: FormControl = new FormControl('', Validators.required);
    const lastName: FormControl = new FormControl('', Validators.required);
    const businessName: FormControl = new FormControl('', Validators.required);
    const tradeType: FormControl = new FormControl('', Validators.required);
    const businessAddress: FormControl = new FormControl('', Validators.required);
    const businessCity: FormControl = new FormControl('', Validators.required);
    const businessState: FormControl = new FormControl('', Validators.required);
    const zipCode: FormControl = new FormControl('', Validators.required);
    const businessEmail: FormControl = new FormControl('', [Validators.required, Validators.email]);
    const businessPhone: FormControl = new FormControl('', Validators.required);
    const serveCities: FormControl = new FormControl('', Validators.required);
    const timeToCall: FormControl = new FormControl('', Validators.required);

    this.enrollForm = new FormGroup({
      firstName,
      lastName,
      businessName,
      tradeType,
      businessAddress,
      businessCity,
      businessState,
      zipCode,
      businessEmail,
      businessPhone,
      serveCities,
      timeToCall
    });
  }

  private enumToArray(source: any): any[] {
    const tmpArray: any[] = [];
    Object.keys(source).forEach(key => {
      tmpArray.push({
        label: source[key],
        value: key
      });
    });

    return tmpArray;
  }

  private responseHandler(response: any): void {
    this.showConfirmationMessage = true;
    if (!response) {
      console.log('Failure, There was a problem submitting your request, please try again.');
      return;
    }

    console.log('Success, enrollment information has been sent!!!');
  }

  public submit(): void {
    console.log('Action: submit enroll form');
    console.log(this.enrollForm.getRawValue());
  }
}
