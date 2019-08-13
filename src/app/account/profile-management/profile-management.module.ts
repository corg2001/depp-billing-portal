import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileManagementRoutingModule } from './profile-management-routing.module';
import { BusinessInfoComponent } from './buisness-info/business-info.component';
import { AchDocumentsComponent } from './ach-documents/ach-documents.component';
import { AgreedRatesComponent } from './agreed-rates/agreed-rates.component';
import { ServiceAreasComponent } from './service-areas/service-areas.component';
import { CalendarComponent } from './calendar/calendar.component';

@NgModule({
  declarations: [BusinessInfoComponent, AchDocumentsComponent, AgreedRatesComponent, ServiceAreasComponent, CalendarComponent],
  imports: [
    CommonModule,
    ProfileManagementRoutingModule
  ]
})
export class ProfileManagementModule { }
