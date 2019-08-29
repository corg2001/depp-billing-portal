import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProfileManagementRoutingModule } from './profile-management-routing.module';
import { BusinessInfoComponent } from './business-info/business-info.component';
import { AchDocumentsComponent } from './ach-documents/ach-documents.component';
import { AgreedRatesComponent } from './agreed-rates/agreed-rates.component';
import { ServiceAreasComponent } from './service-areas/service-areas.component';
import { CalendarComponent } from './calendar/calendar.component';

import { ProfileComponent } from './profile/profile.component';
import { AgreedRatesTableComponent } from './agreed-rates/agreed-rates-table/agreed-rates-table.component';
import { ProfileService } from './service/profile.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfileAbstractService } from './service/abstract/profile.abstract.service';
import { ProfileFactoryAbstractService } from './service/factory/abstract/profile.factory.abstract.service';
import { ProfileFactoryService } from './service/factory/profile.factory.service';

@NgModule({
  // tslint:disable-next-line: max-line-length
  declarations: [
    ProfileComponent,
    BusinessInfoComponent,
    AchDocumentsComponent,
    AgreedRatesComponent,
    ServiceAreasComponent,
    CalendarComponent,
    AgreedRatesTableComponent
  ],
  imports: [
    CommonModule,
    ProfileManagementRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [
    {
      provide: ProfileAbstractService,
      useClass: ProfileService
    },
    {
      provide: ProfileFactoryAbstractService,
      useClass: ProfileFactoryService
    }
  ]
})
export class ProfileManagementModule {}
