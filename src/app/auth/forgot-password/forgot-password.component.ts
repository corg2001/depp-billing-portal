import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, Validator } from '@angular/forms';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

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
  public isLoading: boolean = false;
  public forgotPasswordForm: FormGroup;
  public isCompromised: boolean = false;
  public compromisedMsg: string = `<p>We recently experienced a security breach with one of our third-party vendors which may have impacted the password for your online manager.</p>
    <p>For security purposes, please change your password.</p>`;

  // TODO: get the phone number value from the configuration
  // TODO: fix tslint, add global configuration
  public contactPhoneNumber: string = environment.core.customerServiceNumber;

  constructor(private _authService: AuthService) { }

  ngOnInit() {
    this.isCompromised = sessionStorage.getItem('compromised-login') === 'true';
    this.buildForm();
    this.response$.subscribe((response: string) => {
      this.responseMsg = response;
      this.isLoading = false;
    });
    this.isUserFound$.subscribe((reponse: boolean) => this.isUserFound = reponse);
  }

  public forgotPassword(): void {
    this.isSubmitted = true;
    this.isLoading = true;
    const userEmail: string = this.forgotPasswordForm.get('userEmail').value;
    this._authService.requestPassword(this.response$, userEmail, this.isUserFound$);
  }

  public buildForm(): void {
    console.log('Action: building reset password form ...');
    const userEmail: FormControl = new FormControl('', [Validators.required, Validators.email]);

    this.forgotPasswordForm = new FormGroup({
      userEmail
    });
  }

}
