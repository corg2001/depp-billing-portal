import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeadGenerationRoutingModule } from './lead-generation-routing.module';
import { EnrollComponent } from './enroll/enroll.component';
import { LayoutModule } from '../layout/layout.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [EnrollComponent],
  imports: [
    CommonModule,
    LeadGenerationRoutingModule,
    LayoutModule,
    ReactiveFormsModule
  ]
})
export class LeadGenerationModule { }
