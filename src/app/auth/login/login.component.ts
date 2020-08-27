import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';


// Development Artifacts
import { AuthService } from '../auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PrivacyPolicyComponent } from '../privacy-policy/privacy-policy.component';
import { TermsOfUseComponent } from '../terms-of-use/terms-of-use.component';
import { LoginErrorEnum } from './model/enums/login-error.enums';
import { LocalStorageEnum } from 'src/app/core/enums/local-storage.enums';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public responseSubject: Subject<boolean> = new Subject<boolean>();
  public dataSubject: Subject<any> = new Subject<any>();
  public loginForm: FormGroup;
  public showLoadingSpinner: boolean = false;
  public showResponseError: boolean = false;
  public responseErrorMessage: string;
  private errorMessage: string =
    // tslint:disable-next-line: max-line-length
    `Sign in failed. Please re-enter your password to try again. If you need help, give Contractor Relations a call at ${environment.core.customerServiceNumber}.`;

  // TODO: Pull this information from teh config
  public siblingPortals: any = {
    customer: environment.siblingPortals.customer,
    realtor: environment.siblingPortals.realtor
  };

  constructor(
    private _authService: AuthService,
    private _ngbModalService: NgbModal,
    private _router: Router
  ) { }

  ngOnInit() {
    this.buildForm();
    this.dataSubject.subscribe((data: any) => {
      this.responseErrorMessage = this.getErrorMessage(data.error.message);
    });
    this.responseSubject.subscribe((response: boolean) => this.loginSubscriptionHandler(response));
  }

  public buildForm(): void {
    const userName: FormControl = new FormControl('', [
      Validators.required,
      Validators.email
    ]);
    const userPassword: FormControl = new FormControl('', Validators.required);

    this.loginForm = new FormGroup({
      userName,
      userPassword
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
    this._authService.login(
      this.responseSubject,
      this.dataSubject,
      username,
      password
    );

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
    const value: string = status.toLocaleLowerCase();
    return value.includes('your account is locked') ? environment.auth.lockedError : environment.auth.loginError;
  }
}
