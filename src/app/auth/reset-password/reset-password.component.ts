import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl
} from '@angular/forms';

// Development Artifacts
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';

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
export class ResetPasswordComponent implements OnInit, OnDestroy {
  public resetForm: FormGroup;
  public resetParms$: Subscription;
  public errorMsg: string;
  public successMsg: string;
  public showErrorMsg: boolean = false;
  public showSuccessMsg: boolean = false;

  constructor(
    private _authService: AuthService,
    private _formBuilder: FormBuilder,
    private _activeRoute: ActivatedRoute,
    private _route: Router
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  public buildForm(): void {
    this.resetForm = this._formBuilder.group(
      {
        newPassword: ['', Validators.required],
        confirmPassword: ['', Validators.required]
      },
      { validators: this._matchPassowrds }
    );
  }

  public get rf(): any {
    return this.resetForm.controls;
  }

  public resetPassword(): void {
    const isSuccesFul$: Subject<boolean> = new Subject();
    const response$: Subject<any> = new Subject();
    let restToken: string;
    this.resetParms$ = this._activeRoute.paramMap.subscribe((params: any) => {
      restToken = params.params.restToken;
      const newPassword: string = this.resetForm.get('newPassword').value;
      this._authService.resetPassword(
        restToken,
        newPassword,
        isSuccesFul$,
        response$
      );
      isSuccesFul$.subscribe((succeded: boolean) => {
        succeded
          ? this._resetPasswordSuccessHandler()
          : this._resetPasswordErrorHandler(response$);
      });
      response$.subscribe((response: any) => {
        console.log('this is the response from reset password call');
        console.log(response);
      });
    });
  }

  private _matchPassowrds(group: FormGroup): void {
    const newPassword: AbstractControl = group.get('newPassword');
    const confirmPassword: AbstractControl = group.get('confirmPassword');

    if (confirmPassword.errors && !confirmPassword.errors.mustMatch) {
      return;
    }

    newPassword.value !== confirmPassword.value && confirmPassword.value
      ? confirmPassword.setErrors({ mustMatch: true })
      : confirmPassword.setErrors(null);
  }

  private _resetPasswordSuccessHandler(): void {
    this.successMsg = 'Great! Your password has been updated!';
    this.showErrorMsg = false;
    this.showSuccessMsg = true;
    // removed for validation if want to redirect user to login page
    // this._route.navigate(['auth/login']);
  }

  private _resetPasswordErrorHandler(response$: Subject<any>): void {
    response$.subscribe((error: any) => {
      this.showErrorMsg = true;
      this.showSuccessMsg = false;
      this.errorMsg = error.error.message;
    });
  }

// will have to get the token from the link in email if broweser is refreshed
  ngOnDestroy(): void {
    this.resetParms$.unsubscribe();
  }
}
