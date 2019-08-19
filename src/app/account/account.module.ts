import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Development artifacts
import { AccountRoutingModule } from './account-routing.module';
import { ClaimManagementModule } from './claim-management/claim-management.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutModule } from '../layout/layout.module';
import { PartyResolverService } from './party-resolver.service';
import {HelpComponent} from './help/help.component';


@NgModule({
  declarations: [
    DashboardComponent,
    HelpComponent,
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    RouterModule,
    LayoutModule,
    ClaimManagementModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    PartyResolverService
  ],
})
export class AccountModule { }
