import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentComponent } from './payment/payment.component';
import { PaymentManagementRoutingModule } from './payment-management-routing.module';
import { SearchBoxComponent } from './search-box/search-box.component';
import { PaymentTableComponent } from './payment-table/payment-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PaymentComponent, SearchBoxComponent, PaymentTableComponent],
  imports: [
    CommonModule,
    PaymentManagementRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PaymentManagementModule { }
