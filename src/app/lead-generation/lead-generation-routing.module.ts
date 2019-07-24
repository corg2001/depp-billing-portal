import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublicLayoutComponent } from '../layout/public-layout/public-layout.component';
import { EnrollComponent } from './enroll/enroll.component';

const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      {
        path: '',
        component: EnrollComponent
      },
      {
        path: '**',
        redirectTo: '/account',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeadGenerationRoutingModule { }
