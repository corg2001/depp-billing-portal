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
import { AgreedRatesAbstractService } from './agreed-rates/service/abstract/agreed-rates.abstract.service';
import { AgreedRatesService } from './agreed-rates/service/agreed-rates.service';
import { ProfileService } from './service/profile.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfileAbstractService } from './service/abstract/profile.abstract.service';
import { ProfileFactoryAbstractService } from './service/factory/abstract/profile.factory.abstract.service';
import { ProfileFactoryService } from './service/factory/profile.factory.service';
import { AgreedRatesFactoryAbstractService } from './agreed-rates/service/factory/abstract/agreed-rates.factory.abstract.service';
import { AgreedRatestFactoryService } from './agreed-rates/service/factory/agreed-ratest.factory.service';
import { AgreedRateDetailComponent } from './agreed-rates/agreed-rate-detail/agreed-rate-detail.component';
import { CalenderInfoComponent } from './calendar/calender-info/calender-info.component';
import { ServiceInfoComponent } from './calendar/service-call/service-info.component';
import { SearchBoxComponent } from './calendar/service-call/search-box/search-box.component';
import { TableComponent } from './calendar/service-call/table/table.component';
import { ServiceAreaSearchComponent } from './service-areas/service-area-search/service-area-search.component';
import { ServiceAreaTableComponent } from './service-areas/service-area-table/service-area-table.component';
import { ServiceAreasAbstractService } from './service-areas/service/abstract/service-areas-abstract.service';
import { ServiceAreasService } from './service-areas/service/service-areas.service';
import { ServiceAreasFactoryAbstractService } from './service-areas/service/factory/abstract/service-areas.factory.abstract.service';
import { ServiceAreasFactoryService } from './service-areas/service/factory/service-areas.factory.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  // tslint:disable-next-line: max-line-length
  declarations: [
    ProfileComponent,
    BusinessInfoComponent,
    AchDocumentsComponent,
    AgreedRatesComponent,
    ServiceAreasComponent,
    CalendarComponent,
    AgreedRatesTableComponent,
    AgreedRateDetailComponent,
    CalenderInfoComponent,
    ServiceInfoComponent,
    SearchBoxComponent,
    TableComponent,
    ServiceAreaSearchComponent,
    ServiceAreaTableComponent
  ],
  imports: [
    CommonModule,
    ProfileManagementRoutingModule,
    FormsModule,
    NgbModule,
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
    },
    {
      provide: AgreedRatesFactoryAbstractService,
      useClass: AgreedRatestFactoryService
    },
    {
      provide: AgreedRatesAbstractService,
      useClass: AgreedRatesService
    },
    { provide: ServiceAreasAbstractService,
      useClass: ServiceAreasService
     },
    {
      provide: ServiceAreasFactoryAbstractService,
      useClass: ServiceAreasFactoryService
    }
  ]
})
export class ProfileManagementModule {}
