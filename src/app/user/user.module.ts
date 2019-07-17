import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Development artifacts
import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { LayoutModule } from '../layout/layout.module';
import { LeadComponent } from './lead/lead.component';
import { UserService } from './user.service';



@NgModule({
  declarations: [
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    LeadComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [],
  providers: [UserService]
})
export class UserModule { }
