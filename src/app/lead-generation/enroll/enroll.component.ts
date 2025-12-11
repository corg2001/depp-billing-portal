import { Component, OnInit } from '@angular/core';
import { States } from './us-states.enum';
import { TimeToCall } from './time-to-call.enum';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { LoggerService } from '../../core/logger.service';
import { EnrollAbstractService } from './services/enroll.abstract.service';
import { LeadGenerationPayloadInterface } from './interface/enroll.payload.inteface';

@Component({
  standalone: false,
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
  public showLoadingSpinner: boolean = false;
  public submitted: boolean = false;
  public dataSubject$: Subject<any> = new Subject<any>();
  public enrolledSubject$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private _loggerService: LoggerService,
    private _formBuilder: FormBuilder,
    private _enrollService: EnrollAbstractService
  ) {}

  ngOnInit() {
    this.completionSubject.subscribe(this._responseHandler.bind(this));
    this.enrollForm = this._formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      business_name: [''],
      trade_type: [''],
      business_address: [''],
      business_city: [''],
      business_state: [''],
      business_postal_code: [''],
      business_email: ['', Validators.email],
      business_phone: ['', [Validators.required, this._phoneValidator]],
      cities_serve: [''],
      best_time_to_reach: ['']
    });
    this.listOfStates = this._enumToArray(States);
    this.timeToCallOptions = this._enumToArray(TimeToCall);
  }

  public get ef(): any {
    return this.enrollForm.controls;
  }
  public submit(): void {
    this.submitted = true;
    this.showLoadingSpinner = true;
    const leadGenerationInfo: LeadGenerationPayloadInterface = this.enrollForm.getRawValue();
    this._enrollService.enroll(
      leadGenerationInfo,
      this.enrolledSubject$,
      this.dataSubject$
    );
    this.dataSubject$.subscribe((response: any) => {
      console.log(response);
    });
    this.enrolledSubject$.subscribe((response: boolean) => {
      response
        ? ((this.showConfirmationMessage = true),
          (this.showLoadingSpinner = false))
        : (this.showConfirmationMessage = false);
    });
  }
  private _enumToArray(source: any): any[] {
    const tmpArray: any[] = [];
    Object.keys(source).forEach(key => {
      tmpArray.push({
        label: source[key],
        value: key
      });
    });

    return tmpArray;
  }

  private _responseHandler(response: any): void {
    this.showConfirmationMessage = true;
    if (!response) {
      this._loggerService.error(
        'There was a problem submitting your request, please try again.'
      );
      return;
    }
  }
  // Validates US phone numbers
  private _phoneValidator(number): any {
    if (number.pristine || number.value === '') {
      return null;
    }
    const PHONE_REGEXP = /^[0-9]{10}$/;
    number.markAsTouched();
    if (PHONE_REGEXP.test(number.value)) {
      return null;
    }
    return {
      invalidPhone: true
    };
  }
}
