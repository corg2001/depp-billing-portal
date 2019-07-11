import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileTestComponent } from './profile-test/profile-test.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileTestComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileManagementRoutingModule { }
