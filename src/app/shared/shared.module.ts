import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [ModalComponent, LoadingSpinnerComponent],
  imports: [
    CommonModule
  ],
  exports: [
    ModalComponent,
    LoadingSpinnerComponent
  ],
  entryComponents: [
    ModalComponent
  ],
})
export class SharedModule { }
