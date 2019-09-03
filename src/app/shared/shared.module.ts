import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { FormatMoney } from './pipe/price-format.pipe';

@NgModule({
  declarations: [ModalComponent, LoadingSpinnerComponent, FormatMoney],
  imports: [
    CommonModule
  ],
  exports: [
    ModalComponent,
    LoadingSpinnerComponent,
    FormatMoney
  ],
  entryComponents: [
    ModalComponent
  ],
})
export class SharedModule { }
