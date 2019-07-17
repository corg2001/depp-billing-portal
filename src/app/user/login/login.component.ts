import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  constructor() { }

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
  }

  public openTermsConditionsModal(): void {
    console.log('action: opening terms and conditions modal...');
  }

}
