import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClaimManagementRoutingModule } from './claim-management-routing.module';
import { ClaimTestComponent } from './claim-test/claim-test.component';

@NgModule({
  declarations: [ClaimTestComponent],
  imports: [
    CommonModule,
    ClaimManagementRoutingModule
  ]
})
export class ClaimManagementModule { }
