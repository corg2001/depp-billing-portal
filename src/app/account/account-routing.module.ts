import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PrivateLayoutComponent } from '../layout/private-layout/private-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { PartyResolverService } from './party-resolver.service';
import {HelpComponent} from './help/help.component';
import { ServiceChangesComponent } from '../shared/components/service-changes/service-changes.component';

const routes: Routes = [
  {
    path: '',
    component: PrivateLayoutComponent,
    canActivate: [AuthGuard],
    resolve: { data: PartyResolverService},
    children: [
      {
        path: 'claim',
        loadChildren: './claim-management/claim-management.module#ClaimManagementModule'
      },
      {
        path: 'invoice',
        loadChildren: './invoice-management/invoice-management.module#InvoiceManagementModule'
      },
      {
        path: 'profile',
        loadChildren: './profile-management/profile-management.module#ProfileManagementModule'
      },
      {
        path: 'help',
        component: HelpComponent
      },
      {
        path: 'payments',
        loadChildren: './payment-management/payment-management.module#PaymentManagementModule'
      },
      {
        path: 'service-changes',
        component: ServiceChangesComponent
      },
      {
        path: '',
        component: DashboardComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/account',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
