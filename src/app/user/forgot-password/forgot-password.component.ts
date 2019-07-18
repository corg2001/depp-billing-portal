import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, Validator } from '@angular/forms';

// Development Artifacts
import { UserService } from '../user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  public resetForm: FormGroup;
  // TODO: get the phone number value from the configuration
  // TODO: fix tslint, add global configuration
  // tslint:disable-next-line:no-inferrable-types
  public contactPhoneNumber: string = '(888) 492-7359';

  constructor( private userService: UserService) { }

  ngOnInit() {
    this.buildForm();
  }

  public resetPassword(): void {
    console.log('Action: request new password!');
  }

  public buildForm(): void {
    console.log('Action: building reset password form ...');
    const userEmail: FormControl = new FormControl('', [Validators.required, Validators.email]);

    this.resetForm = new FormGroup( {
      userEmail
    });
  }

}
