import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

// Development Artifacts
import { UserService } from '../user.service';

function ValidateEmail(c: FormControl): any {
  // TODO: Implement a real validation for password match
  if (true) {
    return {
      passwordNoMatch: {
        error: 'Password dont match ...'
      }
    };
  }
  return false;
}

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  public resetForm: FormGroup;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.buildForm();
  }

  public buildForm(): void {
    console.log('Action: building reset form ...');

    const newPassword: FormControl = new FormControl('', Validators.required);
    const confirmPassword: FormControl = new FormControl('', [Validators.required, ValidateEmail]);

    this.resetForm = new FormGroup({
      newPassword,
      confirmPassword
    });
  }

  public resetPassword(): void {
    console.log('Action: setting new password ...');
  }

}
