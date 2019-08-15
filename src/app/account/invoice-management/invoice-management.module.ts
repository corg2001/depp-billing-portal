import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceManagementRoutingModule } from './invoice-management-routing.module';
import { InvoiceHistoryComponent } from './invoice/invoice-history.component';
import { InvoiceTableComponent } from './invoice/invoice-table/invoice-table.component';
import { InvoiceListComponent } from './invoice/invoice-list/invoice-list.component';
import { InvoiceSearchComponent } from './invoice/invoice-search/invoice-search.component';
import { InvoiceService } from './invoice.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    InvoiceHistoryComponent, 
    InvoiceTableComponent,
    InvoiceListComponent,
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
  exports: [
    InvoiceHistoryComponent
  ],
  providers: [
    InvoiceService,
  ]
})
export class InvoiceManagementModule { }
