import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusinessInfoComponent } from './buisness-info/business-info.component';
import { AchDocumentsComponent } from './ach-documents/ach-documents.component';

const routes: Routes = [
  {
    path: '',
    component: BusinessInfoComponent,
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
