import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClaimManagementRoutingModule } from './claim-management-routing.module';
import { ClaimSummaryComponent } from './claim-summary/claim-summary.component';
import { SearchBoxComponent } from './claim-summary/search-box/search-box.component';
import { ClaimListComponent } from './claim-summary/claim-list/claim-list.component';
import { ClaimService } from './claim.service';

@NgModule({
  declarations: [
    ClaimSummaryComponent,
    SearchBoxComponent,
    ClaimListComponent
  ],
  imports: [
    CommonModule,
    ClaimManagementRoutingModule
  ],
  exports: [
    ClaimSummaryComponent
  ],
  providers: [
    ClaimService,
  ]
})
export class ClaimManagementModule { }
