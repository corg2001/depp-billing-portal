import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceManagementRoutingModule } from './invoice-management-routing.module';
import { InvoiceHistoryComponent } from './invoice/invoice-history.component';
import { InvoiceTableComponent } from './invoice/invoice-table/invoice-table.component';
import { InvoiceService } from './service/invoice.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbDatepicker, NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../shared/shared.module';
import { InvoiceAsbstractService } from './service/abstract/invoice.asbstract.service';
import { InvoiceFactoryService } from './service/factory/invoice.factory.service';
import { InvoiceFactoryAbstractService } from './service/factory/abstract/invoice.factory.abstract.service';
import { InvoiceSearchComponent } from './invoice/invoice-search/invoice-search.component';

@NgModule({
  declarations: [
    InvoiceHistoryComponent,
    InvoiceTableComponent,
    InvoiceSearchComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InvoiceManagementRoutingModule,
    NgbModule,
    SharedModule
  ],
  exports: [InvoiceHistoryComponent],
  providers: [
    {
      provide: InvoiceAsbstractService,
      useClass: InvoiceService
    },
    {
      provide: InvoiceFactoryAbstractService,
      useClass: InvoiceFactoryService
    },
    {
      provide: NgbDateAdapter,
      useClass: NgbDateNativeAdapter
    }
  ]
})
export class InvoiceManagementModule {}
