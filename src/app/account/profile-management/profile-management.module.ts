import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileManagementRoutingModule } from './profile-management-routing.module';
import { BusinessInfoComponent } from './business-info/business-info.component';
import { AchDocumentsComponent } from './ach-documents/ach-documents.component';
import { AgreedRatesComponent } from './agreed-rates/agreed-rates.component';
import { ServiceAreasComponent } from './service-areas/service-areas.component';
import { CalendarComponent } from './calendar/calendar.component';

import {ProfileComponent} from './profile/profile.component';
import { AgreedRatesTableComponent } from './agreed-rates/agreed-rates-table/agreed-rates-table.component';

@NgModule({
  // tslint:disable-next-line: max-line-length
  declarations: [ProfileComponent,BusinessInfoComponent, AchDocumentsComponent, AgreedRatesComponent, ServiceAreasComponent, CalendarComponent, AgreedRatesTableComponent],
  imports: [
    CommonModule,
    ProfileManagementRoutingModule
  ]
})
export class ProfileManagementModule { }
