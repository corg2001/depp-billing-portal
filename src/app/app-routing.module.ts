import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestComponent } from './test/test.component';
import { environment } from '../environments/environment';
import { MaintenancePageComponent } from './maintenance-page/maintenance-page.component';

let maintenancePath: string = 'maintenance';
environment.core.maintenance.active
  ? (maintenancePath = '**')
  : (maintenancePath = 'maintenance');

const routes: Routes = [
  {
    path: maintenancePath,
    pathMatch: 'full',
    component: MaintenancePageComponent
  },
  {
    path: 'test',
    component: TestComponent,
  },
  {
    path: 'auth',
    loadChildren: './auth/auth.module#AuthModule'
  },
  {
    path: 'account',
    loadChildren: './account/account.module#AccountModule'
  },
  {
    path: 'enroll',
    loadChildren: './lead-generation/lead-generation.module#LeadGenerationModule'
  },
  { path: '', pathMatch: 'full', redirectTo: 'account' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
