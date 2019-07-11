import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '../layout/layout.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    RouterModule,
    LayoutModule
  ]
})
export class AccountModule { }
