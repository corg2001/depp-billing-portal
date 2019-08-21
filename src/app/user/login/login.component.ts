import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Route, Router } from '@angular/router';

// Development Artifacts
import { UserService } from '../user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PrivacyPolicyComponent } from '../privacy-policy/privacy-policy.component';
import { TermsOfUseComponent } from '../terms-of-use/terms-of-use.component';


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
  private errorMessage:string="Sign in failed. Please re-enter your password to try again. If you need help, give Contractor Relations a call at 1-888-888-8888";

  // TODO: Pull this information from teh config
  public siblingPortals: any  = {
    customer: 'https://unify-hwa-portal-qa10.engine.host',
    realtor: 'https://unify-hwa-realtor-portal-qa10.engine.host'
  };

  constructor(
    private userService: UserService,
    private ngbModalService: NgbModal,
    private router: Router,
  ) { }

  ngOnInit() {
    this.buildForm();
    this.dataSubject.subscribe((data: any) => {
      if(data.error.message==='user authentication failed'){
        data.error.message=this.errorMessage;
      }
      this.responseErrorMessage = data.error.message;
    });
    this.responseSubject.subscribe(this.loginSubscriptionHandler.bind(this));
  }

  public buildForm(): void {
    const userName: FormControl = new FormControl('', [Validators.required, Validators.email]);
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
    this.router.navigate(['/account']);
  }

  public login(): void {
    const username = this.loginForm.get('userName').value.trim();
    const password = this.loginForm.get('userPassword').value.trim();
    this.userService.login(this.responseSubject, this.dataSubject, username, password);
    this.showLoadingSpinner = true;
  }

  public openPrivacyPolicyModal(): void {
    this.ngbModalService.open(PrivacyPolicyComponent);
  }

  public openTermsConditionsModal(): void {
    this.ngbModalService.open(TermsOfUseComponent);
  }

  public resetResponseError(): void {
    this.responseErrorMessage = '';
    this.showResponseError = false;
  }

}
