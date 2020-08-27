import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, Validator } from '@angular/forms';
import { Subject } from 'rxjs';

// Development Artifacts
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  private response$: Subject<string> = new Subject<string>();
  public responseMsg: string = '';
  public isUserFound$: Subject<boolean> = new Subject<boolean>();
  public isUserFound: boolean = false;
  public isSubmitted: boolean = false;
  public isComplete$: Subject<boolean> = new Subject<boolean>();
  public isLoading: boolean = false;
  public forgotPasswordForm: FormGroup;
  // TODO: get the phone number value from the configuration
  // TODO: fix tslint, add global configuration
  public contactPhoneNumber: string = '(888) 492-7359';

  constructor(private _authService: AuthService) { }

  ngOnInit() {
    this.buildForm();
    this.response$.subscribe((response: string) => {
      this.responseMsg = response;
      this.isLoading = false;
    });
    this.isUserFound$.subscribe((reponse: boolean) => this.isUserFound = reponse);
  }

  public forgotPassword(): void {
    console.log('Action: request new password!');
    this.isSubmitted = true;
    this.isLoading = true;
    const userEmail: string = this.forgotPasswordForm.get('userEmail').value;
    this._authService.requestPassword(this.isComplete$, this.response$, userEmail, this.isUserFound$);
  }

  public buildForm(): void {
    console.log('Action: building reset password form ...');
    const userEmail: FormControl = new FormControl('', [Validators.required, Validators.email]);

    this.forgotPasswordForm = new FormGroup({
      userEmail
    });
  }

}
