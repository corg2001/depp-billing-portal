import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileManagementRoutingModule } from './profile-management-routing.module';
import { ProfileTestComponent } from './profile-test/profile-test.component';

@NgModule({
  declarations: [ProfileTestComponent],
  imports: [
    CommonModule,
    ProfileManagementRoutingModule
  ]
})
export class ProfileManagementModule { }
