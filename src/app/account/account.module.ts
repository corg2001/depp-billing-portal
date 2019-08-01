import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { LayoutModule } from '../layout/layout.module';
import { AccountRoutingModule } from './account-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    RouterModule,
    LayoutModule,
  ],
})
export class AccountModule { }
