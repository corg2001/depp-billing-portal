import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AchDocumentsComponent } from './ach-documents/ach-documents.component';
import { ProfileComponent } from './profile/profile.component';
import { AgreedRatesComponent } from './agreed-rates/agreed-rates.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
  },
  {
    path: 'ach-documents',
    component: AchDocumentsComponent,
  },
  {
    path: 'agreed-rates',
    component: AgreedRatesComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileManagementRoutingModule { }
