import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceManagementRoutingModule } from './invoice-management-routing.module';
import { InvoiceTestComponent } from './invoice-test/invoice-test.component';

@NgModule({
  declarations: [InvoiceTestComponent],
  imports: [
    CommonModule,
    InvoiceManagementRoutingModule
  ]
})
export class InvoiceManagementModule { }
