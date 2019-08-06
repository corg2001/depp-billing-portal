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

  public loginForm: FormGroup;
  public responseSubject: Subject<boolean> = new Subject<boolean>();
  public showLoadingSpinner: boolean = false;

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
    this.showLoadingSpinner = false;
    if (response) {
      this.router.navigate(['/account']);
      return;
    }
  }

  public login(): void {
    const username = this.loginForm.get('userName').value.trim();
    const password = this.loginForm.get('userPassword').value.trim();
    this.userService.login(this.responseSubject, username, password);
    this.showLoadingSpinner = true;
  }

  public openPrivacyPolicyModal(): void {
    this.ngbModalService.open(PrivacyPolicyComponent);
  }

  public openTermsConditionsModal(): void {
    this.ngbModalService.open(TermsOfUseComponent);
  }

}
