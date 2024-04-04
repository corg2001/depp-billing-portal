import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

// Development Artifacts
import { AuthService } from '../auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PrivacyPolicyComponent } from '../privacy-policy/privacy-policy.component';
import { TermsOfUseComponent } from '../terms-of-use/terms-of-use.component';
import { LocalStorageEnum } from 'src/app/core/enums/local-storage.enums';
import { environment } from 'src/environments/environment';
import { CognitoService } from '../cognito.service';
import { ICognitoLoginResponse } from 'src/app/shared/models/interface/cognito.interface';
import { SessionKeys } from 'src/app/shared/enums/session-keys.emums';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public responseSubject: Subject<boolean> = new Subject<boolean>();
  public dataSubject: Subject<any> = new Subject<any>();
  public loginForm: FormGroup;
  public showLoadingSpinner: boolean = false;
  public showResponseError: boolean = false;
  public responseErrorMessage: string;
  public termsOfUseUrl = environment.legalTerms.termsOfUse;
  public privacyPolicyUrl = environment.legalTerms.privacyPolicy;
  private errorMessage: string =
    // tslint:disable-next-line: max-line-length
    `Sign in failed. Please re-enter your password to try again. If you need help, give Contractor Relations a call at ${environment.core.customerServiceNumber}.`;

  // TODO: Pull this information from teh config
  public siblingPortals: any = {
    customer: environment.siblingPortals.customer,
  };

  constructor(
    private _authService: AuthService,
    private _ngbModalService: NgbModal,
    private _router: Router,
    private _cognitoService: CognitoService,
  ) { }

  ngOnInit() {
    this.buildForm();
    this.dataSubject.subscribe((data: any) => {
      if (data.error.message && data.error.message.includes('compromised')) {
        sessionStorage.setItem('compromised-login', 'true');
        this._router.navigate(['/auth/forgot-password']);
      }
      this.responseErrorMessage = this.getErrorMessage(data.error.message);
      this.showResponseError = true;
    });
    this.responseSubject.subscribe((response: boolean) =>
      this.loginSubscriptionHandler(response)
    );
  }

  public buildForm(): void {
    const userName: FormControl = new FormControl('', [
      Validators.required,
      Validators.email,
    ]);
    const userPassword: FormControl = new FormControl('', Validators.required);

    this.loginForm = new FormGroup({
      userName,
      userPassword,
    });
  }

  public loginSubscriptionHandler(response: boolean): void {
    if (!response) {
      this.showLoadingSpinner = false;
      this.showResponseError = true;
      return;
    }
    this._router.navigate(['/account']);
  }

  public login(): void {
    const username: string = this.loginForm.get('userName').value.trim();
    const password: string = this.loginForm.get('userPassword').value.trim();
    let credentials = {
      password,
      username,
    }
    this._cognitoService.login(credentials).subscribe({
      next: (loginResponse: ICognitoLoginResponse) => {
        this.errorMessage = '';
        this._authService.setUser(loginResponse);
        sessionStorage.setItem(SessionKeys.Authorization, JSON.stringify(loginResponse));
        sessionStorage.setItem(SessionKeys.UserName, credentials.username);
        this._authService.loginSuccessHandler(
          this.responseSubject,
          this.dataSubject,
          loginResponse
        )
      },
      error: (error) => {
        this.showResponseError = true;
        if (error) {
          this.showLoadingSpinner = false;
          this.responseErrorMessage =
            'The email address or password you entered is incorrect. Please re-enter your login information or email service@nrgprotects.com for any further assistance.';
        } else {
          this.responseErrorMessage = error.error.message;
        }
      },
    });

    localStorage.setItem(LocalStorageEnum.UserName, username);
    this.showLoadingSpinner = true;
  }

  public openPrivacyPolicyModal(): void {
    this._ngbModalService.open(PrivacyPolicyComponent);
  }

  public openTermsConditionsModal(): void {
    this._ngbModalService.open(TermsOfUseComponent);
  }

  public resetResponseError(): void {
    this.responseErrorMessage = '';
    this.showResponseError = false;
  }

  public getErrorMessage(status: string): string {
    const value: string = status ? status.toLocaleLowerCase() : '';
    return value.includes('your account is locked')
      ? environment.auth.lockedError
      : environment.auth.loginError;
  }
}
