import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeadGenerationRoutingModule } from './lead-generation-routing.module';
import { EnrollComponent } from './enroll/enroll.component';
import { LayoutModule } from '../layout/layout.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EnrollService } from './enroll/services/enroll.service';
import { EnrollAbstractService } from './enroll/services/enroll.abstract.service';

@NgModule({
  declarations: [EnrollComponent],
  imports: [
    CommonModule,
    LeadGenerationRoutingModule,
    LayoutModule,
    ReactiveFormsModule
  ],
  providers : [
    {
      provide: EnrollAbstractService,
      useClass: EnrollService
    }
  ]
})
export class LeadGenerationModule { }
