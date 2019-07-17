import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, Validator } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  public resetForm: FormGroup;

  constructor() { }

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
