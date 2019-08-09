import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClaimManagementRoutingModule } from './claim-management-routing.module';
import { ClaimSummaryComponent } from './claim-summary/claim-summary.component';
import { SearchBoxComponent } from './claim-summary/search-box/search-box.component';
import { ClaimListComponent } from './claim-summary/claim-list/claim-list.component';
import { ClaimService } from './claim.service';
import { ClaimTableComponent } from './claim-summary/claim-table/claim-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../shared/shared.module';
@NgModule({
  declarations: [
    ClaimSummaryComponent,
    SearchBoxComponent,
    ClaimListComponent,
    ClaimTableComponent
  ],
  imports: [
    CommonModule,
    ClaimManagementRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    SharedModule
  ],
  exports: [
    ClaimSummaryComponent
  ],
  providers: [
    ClaimService,
  ]
})
export class ClaimManagementModule { }
