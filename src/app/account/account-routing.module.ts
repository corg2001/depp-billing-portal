import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PrivateLayoutComponent } from '../layout/private-layout/private-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { PartyResolverService } from './party-resolver.service';
import {HelpComponent} from './help/help.component';

const routes: Routes = [
  {
    path: '',
    component: PrivateLayoutComponent,
    canActivate: [AuthGuard],
    resolve: { data: PartyResolverService},
    children: [
      {
        path: 'claim',
        loadChildren: () => import('./claim-management/claim-management.module').then(m => m.ClaimManagementModule)
      },
      {
        path: 'invoice',
        loadChildren: () => import('./invoice-management/invoice-management.module').then(m => m.InvoiceManagementModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile-management/profile-management.module').then(m => m.ProfileManagementModule)
      },
      {
        path: 'help',
        component: HelpComponent
      },
      {
        path: 'payments',
        loadChildren: () => import('./payment-management/payment-management.module').then(m => m.PaymentManagementModule)
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
