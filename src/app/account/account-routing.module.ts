import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PrivateLayoutComponent } from '../layout/private-layout/private-layout.component';

const routes: Routes = [
  {
    path: '',
    component: PrivateLayoutComponent,
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
