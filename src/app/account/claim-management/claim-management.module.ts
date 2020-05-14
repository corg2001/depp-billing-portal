import { DataLossGuard } from './../data-loss.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClaimManagementRoutingModule } from './claim-management-routing.module';
import { ClaimSummaryComponent } from './claim-summary/claim-summary.component';
import { SearchBoxComponent } from './claim-summary/search-box/search-box.component';
import { ClaimService } from './service/claim.service';
import { ClaimTableComponent } from './claim-summary/claim-table/claim-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../shared/shared.module';
import { ClaimFactoryService } from './service/factory/claim.factory.service';
import { ClaimServiceAbstract } from './service/abstract/claim.abstract.service';
import { ClaimFactoryServiceAbstract } from './service/factory/claim.factory.abstract.service';
import { ClaimNotificationComponent } from './claim-summary/claim-notification/claim-notification.component';
import { DiagnosisSelectModalComponent } from './diagnosis/diagnosis-select-modal/diagnosis-select-modal.component';
import { ApplianceFormFactory } from './service/factory/form/appliance.form.factory';
import { ApplianceFormFactoryAbstract } from './service/abstract/appliance.form.factory.abstract';
import { DiagnosisFormFactory } from './service/factory/form/diagnosis.form.factory';
import { DiagnosisFormFactoryAbstract } from './service/abstract/diagnosis.form.factory.abstract';
import { FormApplianceComponent } from './diagnosis/form-appliance/form-appliance.component';
import { DiagnosisFormComponent } from './diagnosis/diagnosis-form.component';
import { FormHvacComponent } from './diagnosis/form-hvac/form-hvac.component';
import { FormPoolComponent } from './diagnosis/form-pool/form-pool.component';
import { BaseDiagnosisFormComponent } from './diagnosis/base-diagnosis-form/base-diagnosis-form.component';
import { ApplianceCurrentUnitComponent } from './diagnosis/form-appliance/appliance-current-unit/appliance-current-unit.component';
import { ApplianceRefrigeratorComponent } from './diagnosis/form-appliance/appliance-refrigerator/appliance-refrigerator.component';
import { ApplianceDishwasherComponent } from './diagnosis/form-appliance/appliance-dishwasher/appliance-dishwasher.component';
import { ApplianceRangeComponent } from './diagnosis/form-appliance/appliance-range/appliance-range.component';
import { ApplianceWallOvenComponent } from './diagnosis/form-appliance/appliance-wall-oven/appliance-wall-oven.component';
import { PartFailureComponent } from './diagnosis/part-failure/part-failure.component';
import { CostTimeMaterialComponent } from './diagnosis/cost-time-material/cost-time-material.component';
import { CostFlatRateComponent } from './diagnosis/cost-flat-rate/cost-flat-rate.component';
import { NonCoveredChargeComponent } from './diagnosis/non-covered-charge/non-covered-charge.component';
import { TcfComponent } from './diagnosis/tcf/tcf.component';
import { PurchasingComponent } from './diagnosis/purchasing/purchasing.component';
import { JobSummaryCardComponent } from './diagnosis/job-summary-card/job-summary-card.component';
import { HvacFormFactoryAbstract } from './service/abstract/hvac.form.factory.abstract';
import { HvacFormFactory } from './service/factory/form/hvac.form.factory';
import { HvacCurrentUnitComponent } from './diagnosis/form-hvac/hvac-current-unit/hvac-current-unit.component';
import { ApplianceCooktopComponent } from './diagnosis/form-appliance/appliance-cooktop/appliance-cooktop.component';
import { ApplianceWasherComponent } from './diagnosis/form-appliance/appliance-washer/appliance-washer.component';
import { ApplianceDryerComponent } from './diagnosis/form-appliance/appliance-dryer/appliance-dryer.component';
import { ApplianceMicrowaveComponent } from './diagnosis/form-appliance/appliance-microwave/appliance-microwave.component';
import { ApplianceVentHoodComponent } from './diagnosis/form-appliance/appliance-vent-hood/appliance-vent-hood.component';
import { ApplianceOtherComponent } from './diagnosis/form-appliance/appliance-other/appliance-other.component';
import { PoolFormFactoryAbstract } from './service/abstract/pool.form.factory.abstract';
import { PoolFormFactory } from './service/factory/form/pool.form.factory';
import { PoolSpaComponent } from './diagnosis/form-pool/pool-spa/pool-spa.component';
import { FormPlumbingComponent } from './diagnosis/form-plumbing/form-plumbing.component';
import { PlumbingFormFactory } from './service/factory/form/plumbing.form.factory';
import { PlumbingFormFactoryAbstract } from './service/abstract/plumbing.form.factory.abstract';
import { PlumbingComponent } from './diagnosis/form-plumbing/plumbing/plumbing.component';
import { PlumbingGarbageDisposalComponent } from './diagnosis/form-plumbing/plumbing-garbage-disposal/plumbing-garbage-disposal.component';
import { PlumbingStoppageClogComponent } from './diagnosis/form-plumbing/plumbing-stoppage-clog/plumbing-stoppage-clog.component';
import { PlumbingSumpPumpComponent } from './diagnosis/form-plumbing/plumbing-sump-pump/plumbing-sump-pump.component';
import { HvacAdditionalSpecsComponent } from './diagnosis/form-hvac/hvac-additional-specs/hvac-additional-specs.component';
import { HvacReplacementOnlyComponent } from './diagnosis/form-hvac/hvac-replacement-only/hvac-replacement-only.component';
import { FormWaterHeaterComponent } from './diagnosis/form-water-heater/form-water-heater.component';
import { WaterHeaterFormFactoryAbstract } from './service/abstract/water-heater.form.factory.abstract';
import { WaterHeaterFormFactory } from './service/factory/form/water-heater.form.factory';
import { WellPumpSepticFormFactoryAbstract } from './service/abstract/well-pump-septic.form.factory.abstract';
import { WellPumpSepticFormFactory } from './service/factory/form/well-pump-septic.form.factory';
import { FormWellPumpSepticComponent } from './diagnosis/form-well-pump-septic/form-well-pump-septic.component';
import { FormElectricalComponent } from './diagnosis/form-electrical/form-electrical.component';
import { FormExternalComponent } from './diagnosis/form-external/form-external.component';
import { FormOtherComponent } from './diagnosis/form-other/form-other.component';

@NgModule({
  declarations: [
    ClaimSummaryComponent,
    SearchBoxComponent,
    ClaimTableComponent,
    ClaimNotificationComponent,
    DiagnosisSelectModalComponent,
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
    FormOtherComponent
  ],
  imports: [
    CommonModule,
    ClaimManagementRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    SharedModule
  ],
  exports: [ClaimSummaryComponent],
  providers: [
    {
      provide: ClaimServiceAbstract,
      useClass: ClaimService
    },
    {
      provide: ClaimFactoryServiceAbstract,
      useClass: ClaimFactoryService
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
    {
      provide: PoolFormFactoryAbstract,
      useClass: PoolFormFactory
    },
    {
      provide: PlumbingFormFactoryAbstract,
      useClass: PlumbingFormFactory
    },
    {
      provide: WaterHeaterFormFactoryAbstract,
      useClass: WaterHeaterFormFactory
    },
    {
      provide: WellPumpSepticFormFactoryAbstract,
      useClass: WellPumpSepticFormFactory
    },
    DataLossGuard
  ],
  entryComponents: [DiagnosisSelectModalComponent]
})
export class ClaimManagementModule {}
