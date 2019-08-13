import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceManagementRoutingModule } from './invoice-management-routing.module';
import { InvoiceHistoryComponent } from './invoice/invoice-history.component';

@NgModule({
  declarations: [InvoiceHistoryComponent],
  imports: [
    CommonModule,
    InvoiceManagementRoutingModule
  ]
})
export class InvoiceManagementModule { }
