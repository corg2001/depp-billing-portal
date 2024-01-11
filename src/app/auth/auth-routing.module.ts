import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Development artifacts
import { LoginComponent } from './login/login.component';
import { PublicLayoutComponent } from '../layout/public-layout/public-layout.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
      },
      {
        path: 'reset-password/:restToken/:username',
        component: ResetPasswordComponent,
      },
      {
        path: '**',
        redirectTo: '/auth',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
