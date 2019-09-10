import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentComponent } from './payment/payment.component';
import { PaymentManagementRoutingModule } from './payment-management-routing.module';
import { SearchBoxComponent } from './payment/search-box/search-box.component';
import { PaymentTableComponent } from './payment/payment-table/payment-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [PaymentComponent, SearchBoxComponent, PaymentTableComponent],
  imports: [
    CommonModule,
    PaymentManagementRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgbModule
  ]
})
export class PaymentManagementModule { }
