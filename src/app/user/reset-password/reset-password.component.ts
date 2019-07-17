import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  public resetForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.buildForm();
  }

  public buildForm(): void {
    console.log('Action: building reset form ...');

    const newPassword: FormControl = new FormControl('', Validators.required);
    const confirmPassword: FormControl = new FormControl('', Validators.required);

    this.resetForm = new FormGroup({
      newPassword,
      confirmPassword
    });
  }

  public resetPassword(): void {
    console.log('Action: setting new password ...');
  }

}
