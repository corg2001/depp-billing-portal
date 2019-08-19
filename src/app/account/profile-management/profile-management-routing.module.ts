import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AchDocumentsComponent } from './ach-documents/ach-documents.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
  },
  {
    path: 'ach-documents',
    component: AchDocumentsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileManagementRoutingModule { }
