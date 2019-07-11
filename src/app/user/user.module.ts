import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Development artifacts
import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { LayoutModule } from '../layout/layout.module';


@NgModule({
  declarations: [LoginComponent, ForgotPasswordComponent, ResetPasswordComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    LayoutModule
  ]
})
export class UserModule { }
