import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeadGenerationRoutingModule } from './lead-generation-routing.module';
import { EnrollComponent } from './enroll/enroll.component';
import { LayoutModule } from '../layout/layout.module';

@NgModule({
  declarations: [EnrollComponent],
  imports: [
    CommonModule,
    LeadGenerationRoutingModule,
    LayoutModule
  ]
})
export class LeadGenerationModule { }
