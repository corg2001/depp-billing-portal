import { DataLossGuard } from './../data-loss.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClaimManagementRoutingModule } from './claim-management-routing.module';
import { ClaimSummaryComponent } from './claim-summary/claim-summary.component';
import { SearchBoxComponent } from './claim-summary/search-box/search-box.component';
import { ClaimService } from './service/claim.service';
import { ClaimTableComponent } from './claim-summary/claim-table/claim-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../shared/shared.module';
import { ClaimFactoryService } from './service/factory/claim.factory.service';
import { ClaimServiceAbstract } from './service/abstract/claim.abstract.service';
import { ClaimFactoryServiceAbstract } from './service/factory/claim.factory.abstract.service';
import { ClaimNotificationComponent } from './claim-summary/claim-notification/claim-notification.component';
import { DiagnosisSelectModalComponent } from './diagnosis/diagnosis-select-modal/diagnosis-select-modal.component';

@NgModule({
  declarations: [
    ClaimSummaryComponent,
    SearchBoxComponent,
    ClaimTableComponent,
    ClaimNotificationComponent,
    DiagnosisSelectModalComponent
  ],
  imports: [
    CommonModule,
    ClaimManagementRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    SharedModule
  ],
  exports: [ClaimSummaryComponent],
  providers: [
    {
      provide: ClaimServiceAbstract,
      useClass: ClaimService
    },
    {
      provide: ClaimFactoryServiceAbstract,
      useClass: ClaimFactoryService
    }
  ],
  entryComponents: [
    DiagnosisSelectModalComponent
  ]
})
export class ClaimManagementModule {}
