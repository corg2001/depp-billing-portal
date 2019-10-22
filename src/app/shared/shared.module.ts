import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { FormatMoney } from './pipe/price-format.pipe';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { UploadService } from './progress-bar/service/upload.service';
import { ResultJumbotronComponent } from './components/result-jumbotron/result-jumbotron.component';


@NgModule({
  declarations: [ModalComponent, LoadingSpinnerComponent, FormatMoney, ProgressBarComponent, ResultJumbotronComponent],
  imports: [
    CommonModule,
  ],
  exports: [
    ModalComponent,
    LoadingSpinnerComponent,
    FormatMoney,
    ProgressBarComponent,
    ResultJumbotronComponent
  ],
  entryComponents: [
    ModalComponent,
    ProgressBarComponent
  ],

providers: [ UploadService]
})
export class SharedModule { }
