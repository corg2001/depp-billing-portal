import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { FormatMoney } from './pipe/price-format.pipe';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { UploadService } from './progress-bar/service/upload.service';
import { ResultJumbotronComponent } from './components/result-jumbotron/result-jumbotron.component';
import { FormatPhone } from './pipe/phone-number-format';
import { FormatPassword } from './pipe/password-format';
import { FromatLastFour } from './pipe/show-last-four-format';
import { SortableHeaderDirective } from './../core/directive/sortable-header.directive';
import { NgxCurrencyModule } from 'ngx-currency';
import { SearchComponent } from './components/search/search.component';
import { ServiceChangesComponent } from './components/service-changes/service-changes.component';

@NgModule({
  declarations: [
    ModalComponent,
    LoadingSpinnerComponent,
    FormatMoney,
    FormatPhone,
    FormatPassword,
    FromatLastFour,
    ProgressBarComponent,
    ResultJumbotronComponent,
    SearchComponent,
    SortableHeaderDirective,
    ServiceChangesComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    NgxCurrencyModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    ModalComponent,
    LoadingSpinnerComponent,
    FormatMoney,
    FormatPhone,
    FormatPassword,
    FromatLastFour,
    ProgressBarComponent,
    ResultJumbotronComponent,
    SearchComponent,
    SortableHeaderDirective,
    NgxCurrencyModule,
    ServiceChangesComponent
  ],
  entryComponents: [ModalComponent, ProgressBarComponent],

  providers: [UploadService]
})
export class SharedModule {}
