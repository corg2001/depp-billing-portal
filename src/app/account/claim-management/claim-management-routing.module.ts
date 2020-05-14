import { DataLossGuard } from './../data-loss.guard';
import { DiagnosisFormComponent } from './diagnosis/diagnosis-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClaimSummaryComponent } from './claim-summary/claim-summary.component';


const routes: Routes = [
  {
    path: '',
    component:  ClaimSummaryComponent
  },
  {
    path: 'diagnosis/:formType/:jobNumber/:dateRequested/:customerContactPhone',
    component: DiagnosisFormComponent,
    canDeactivate: [DataLossGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClaimManagementRoutingModule { }
