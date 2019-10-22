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
import { ProfileManagementModule } from './profile-management/profile-management.module';
import { HelpAbstractService } from './help/service/abstract/help-abstract.service';
import { HelpService } from './help/service/help.service';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    DashboardComponent,
    HelpComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    RouterModule,
    LayoutModule,
    ClaimManagementModule,
    ProfileManagementModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [
    PartyResolverService,
    { provide: HelpAbstractService, useClass: HelpService}
  ],
})
export class AccountModule { }
