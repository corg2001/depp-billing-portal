import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from 'src/app/shared/shared.module';
import { PdfService } from 'src/app/core/pdf.service';
import { ClaimServiceAbstract } from '../service/abstract/claim.abstract.service';
import { ClaimService } from './../service/claim.service';
import { DataLossGuard } from './../../data-loss.guard';

import { DiagnosisRoutingModule } from './diagnosis-routing.module';
import { HvacFormFactory } from './../service/factory/form/hvac.form.factory';
import { DiagnosisFormFactory } from './../service/factory/form/diagnosis.form.factory';
import { ApplianceFormFactory } from './../service/factory/form/appliance.form.factory';
import { DiagnosisSubmitModalComponent } from './diagnosis-submit-modal/diagnosis-submit-modal.component';
import { FormOtherComponent } from './diagnosis-form/form/form-other/form-other.component';
import { FormExternalComponent } from './diagnosis-form/form/form-external/form-external.component';
import { FormElectricalComponent } from './diagnosis-form/form/form-electrical/form-electrical.component';
import { FormWellPumpSepticComponent } from './diagnosis-form/form/form-well-pump-septic/form-well-pump-septic.component';
import { FormWaterHeaterComponent } from './diagnosis-form/form/form-water-heater/form-water-heater.component';
import { HvacReplacementOnlyComponent } from './diagnosis-form/form/form-hvac/hvac-replacement-only/hvac-replacement-only.component';
import { HvacAdditionalSpecsComponent } from './diagnosis-form/form/form-hvac/hvac-additional-specs/hvac-additional-specs.component';
import { PlumbingSumpPumpComponent } from './diagnosis-form/form/form-plumbing/plumbing-sump-pump/plumbing-sump-pump.component';
import { PlumbingStoppageClogComponent } from './diagnosis-form/form/form-plumbing/plumbing-stoppage-clog/plumbing-stoppage-clog.component';
import { PlumbingGarbageDisposalComponent } from './diagnosis-form/form/form-plumbing/plumbing-garbage-disposal/plumbing-garbage-disposal.component';
import { PlumbingComponent } from './diagnosis-form/form/form-plumbing/plumbing/plumbing.component';
import { FormPlumbingComponent } from './diagnosis-form/form/form-plumbing/form-plumbing.component';
import { PoolSpaComponent } from './diagnosis-form/form/form-pool/pool-spa/pool-spa.component';
import { ApplianceOtherComponent } from './diagnosis-form/form/form-appliance/appliance-other/appliance-other.component';
import { ApplianceVentHoodComponent } from './diagnosis-form/form/form-appliance/appliance-vent-hood/appliance-vent-hood.component';
import { ApplianceMicrowaveComponent } from './diagnosis-form/form/form-appliance/appliance-microwave/appliance-microwave.component';
import { ApplianceDryerComponent } from './diagnosis-form/form/form-appliance/appliance-dryer/appliance-dryer.component';
import { ApplianceWasherComponent } from './diagnosis-form/form/form-appliance/appliance-washer/appliance-washer.component';
import { ApplianceCooktopComponent } from './diagnosis-form/form/form-appliance/appliance-cooktop/appliance-cooktop.component';
import { HvacCurrentUnitComponent } from './diagnosis-form/form/form-hvac/hvac-current-unit/hvac-current-unit.component';
import { JobSummaryCardComponent } from './job-summary-card/job-summary-card.component';
import { PurchasingComponent } from './diagnosis-form/common/purchasing/purchasing.component';
import { TcfComponent } from './diagnosis-form/common/tcf/tcf.component';
import { NonCoveredChargeComponent } from './diagnosis-form/common/non-covered-charge/non-covered-charge.component';
import { CostFlatRateComponent } from './diagnosis-form/common/cost-flat-rate/cost-flat-rate.component';
import { CostTimeMaterialComponent } from './diagnosis-form/common/cost-time-material/cost-time-material.component';
import { PartFailureComponent } from './diagnosis-form/common/part-failure/part-failure.component';
import { ApplianceWallOvenComponent } from './diagnosis-form/form/form-appliance/appliance-wall-oven/appliance-wall-oven.component';
import { ApplianceRangeComponent } from './diagnosis-form/form/form-appliance/appliance-range/appliance-range.component';
import { ApplianceDishwasherComponent } from './diagnosis-form/form/form-appliance/appliance-dishwasher/appliance-dishwasher.component';
import { ApplianceRefrigeratorComponent } from './diagnosis-form/form/form-appliance/appliance-refrigerator/appliance-refrigerator.component';
// tslint:disable-next-line: max-line-length
import { ApplianceCurrentUnitComponent } from './diagnosis-form/form/form-appliance/appliance-current-unit/appliance-current-unit.component';
import { BaseDiagnosisFormComponent } from './diagnosis-form/base-diagnosis-form/base-diagnosis-form.component';
import { FormPoolComponent } from './diagnosis-form/form/form-pool/form-pool.component';
import { FormHvacComponent } from './diagnosis-form/form/form-hvac/form-hvac.component';
import { FormApplianceComponent } from './diagnosis-form/form/form-appliance/form-appliance.component';
import { DiagnosisFormComponent } from './diagnosis-form/diagnosis-form.component';
import { ApplianceFormFactoryAbstract } from '../service/abstract/appliance.form.factory.abstract';
import { DiagnosisFormFactoryAbstract } from '../service/abstract/diagnosis.form.factory.abstract';
import { HvacFormFactoryAbstract } from '../service/abstract/hvac.form.factory.abstract';

@NgModule({
  declarations: [
    DiagnosisFormComponent,
    FormApplianceComponent,
    FormHvacComponent,
    FormPoolComponent,
    BaseDiagnosisFormComponent,
    ApplianceCurrentUnitComponent,
    ApplianceRefrigeratorComponent,
    ApplianceDishwasherComponent,
    ApplianceRangeComponent,
    ApplianceWallOvenComponent,
    PartFailureComponent,
    CostTimeMaterialComponent,
    CostFlatRateComponent,
    NonCoveredChargeComponent,
    TcfComponent,
    PurchasingComponent,
    JobSummaryCardComponent,
    HvacCurrentUnitComponent,
    ApplianceCooktopComponent,
    ApplianceWasherComponent,
    ApplianceDryerComponent,
    ApplianceMicrowaveComponent,
    ApplianceVentHoodComponent,
    ApplianceOtherComponent,
    PoolSpaComponent,
    FormPlumbingComponent,
    PlumbingComponent,
    PlumbingGarbageDisposalComponent,
    PlumbingStoppageClogComponent,
    PlumbingSumpPumpComponent,
    HvacAdditionalSpecsComponent,
    HvacReplacementOnlyComponent,
    FormWaterHeaterComponent,
    FormWellPumpSepticComponent,
    FormElectricalComponent,
    FormExternalComponent,
    FormOtherComponent,
    DiagnosisSubmitModalComponent
  ],
  imports: [
    CommonModule,
    DiagnosisRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    SharedModule
  ],
  providers: [
    {
      provide: ClaimServiceAbstract,
      useClass: ClaimService
    },
    {
      provide: ApplianceFormFactoryAbstract,
      useClass: ApplianceFormFactory
    },
    {
      provide: DiagnosisFormFactoryAbstract,
      useClass: DiagnosisFormFactory
    },
    {
      provide: HvacFormFactoryAbstract,
      useClass: HvacFormFactory
    },
    DataLossGuard,
    PdfService
  ],
  entryComponents: [
    DiagnosisSubmitModalComponent
  ]
})
export class DiagnosisModule { }
