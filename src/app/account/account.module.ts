import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// Development artifacts
import { AccountRoutingModule } from './account-routing.module';
import { ClaimManagementModule } from './claim-management/claim-management.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutModule } from '../layout/layout.module';
import { PartyResolverService } from './party-resolver.service';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    RouterModule,
    LayoutModule,
    ClaimManagementModule
  ],
  providers: [
    PartyResolverService
  ],
})
export class AccountModule { }
