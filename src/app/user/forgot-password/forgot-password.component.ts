import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, Validator } from '@angular/forms';
import { Subject } from 'rxjs';

// Development Artifacts
import { UserService } from '../user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  private completionSubject: Subject<boolean> = new Subject<boolean>();
  public showSuccessMessage: boolean = false;

  public forgotPasswordForm: FormGroup;
  // TODO: get the phone number value from the configuration
  // TODO: fix tslint, add global configuration
  public contactPhoneNumber: string = '(888) 492-7359';

  constructor( private userService: UserService) { }

  ngOnInit() {
    this.buildForm();
    this.completionSubject.subscribe((response: boolean) => {
      if (response ) {
        this.showSuccessMessage = true;
        console.log('Action: New Password request has been successfully sent...');
        return;
      }
    });
  }

  public forgotPassword(): void {
    console.log('Action: request new password!');
    const userEmail: string = this.forgotPasswordForm.get('userEmail').value;
    this.userService.requestPassword(this.completionSubject, userEmail);
  }

  public buildForm(): void {
    console.log('Action: building reset password form ...');
    const userEmail: FormControl = new FormControl('', [Validators.required, Validators.email]);

    this.forgotPasswordForm = new FormGroup( {
      userEmail
    });
  }

}
