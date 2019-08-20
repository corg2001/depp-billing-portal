import { Component, OnInit } from '@angular/core';
import { States } from './us-states.enum';
import { TimeToCall } from './time-to-call.enum';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { LoggerService } from '../../core/logger.service';

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

  constructor(private _loggerService: LoggerService, private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.completionSubject.subscribe(this.responseHandler.bind(this));
    this.enrollForm = this._formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      business_name: [''],
      trade_type: [''],
      address1: [''],
      address2: [''],
      city: [''],
      state: [''],
      country: [''],
      postal_code: [''],
      business_email: [''],
      business_phone: ['', Validators.required],
      cities_serve: [''],
      best_time_to_reach: ['']
    });
    this.listOfStates = this.enumToArray(States);
    this.timeToCallOptions = this.enumToArray(TimeToCall);
  }

  public get ef(): any {
    return this.enrollForm.controls;
  }
  public submit(): void {
    this.showConfirmationMessage = true;
    console.log('Action: submit enroll form');
    console.log(this.enrollForm.getRawValue());
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
      this._loggerService.error('There was a problem submitting your request, please try again.');
      return;
    }
  }

 
}
