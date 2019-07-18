import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  constructor(
    private userService: UserService,
    private ngbModalService: NgbModal
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  public buildForm(): void {
    console.log('action: starting form');

    const userName: FormControl = new FormControl('', Validators.required);
    const userPassword: FormControl = new FormControl('', Validators.required);

    this.loginForm = new FormGroup({
      userName,
      userPassword,
    });
  }

  public login(): void {
    console.log('action: login button has been clicked...');
  }

  public openPrivacyPolicyModal(): void {
    console.log('action: opening privacy modal...');
    this.ngbModalService.open(PrivacyPolicyComponent);
  }

  public openTermsConditionsModal(): void {
    console.log('action: opening terms and conditions modal...');
    this.ngbModalService.open(TermsOfUseComponent);
  }

}
