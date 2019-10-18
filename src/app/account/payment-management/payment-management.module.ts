import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentComponent } from './payment/payment.component';
import { PaymentManagementRoutingModule } from './payment-management-routing.module';
import { SearchBoxComponent } from './payment/search-box/search-box.component';
import { PaymentTableComponent } from './payment/payment-table/payment-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PaymentAbstractService } from './service/abstract/payment.abstract.service';
import { PaymentService } from './service/payment.service';
import { InvoiceModalComponent } from './payment/invoice-modal/invoice-modal.component';

@NgModule({
  declarations: [PaymentComponent, SearchBoxComponent, PaymentTableComponent, InvoiceModalComponent],
  imports: [
    CommonModule,
    PaymentManagementRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgbModule
  ],
  providers: [{ provide: PaymentAbstractService, useClass: PaymentService }],
  entryComponents: [InvoiceModalComponent]
})
export class PaymentManagementModule {}
