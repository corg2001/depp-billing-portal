import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';


// Development artifacts
import { AuthRoutingModule } from './auth-routing.module';
import { LayoutModule } from '../layout/layout.module';
import { SharedModule } from '../shared/shared.module';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AuthService } from './auth.service';
import { NgPasswordHelperModule } from 'ng-password-helper';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsOfUseComponent } from './terms-of-use/terms-of-use.component';


@NgModule({
  declarations: [
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    PrivacyPolicyComponent,
    TermsOfUseComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModalModule,
    SharedModule,
    RouterModule,
    NgPasswordHelperModule
  ],
  exports: [],
  providers: [AuthService],
  entryComponents: [
    PrivacyPolicyComponent,
    TermsOfUseComponent
  ]
})
export class AuthModule { }
