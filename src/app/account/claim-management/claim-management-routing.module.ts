import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClaimInfoComponent } from './claim-summary/claim-info/claim-info.component';
import { ClaimSummaryComponent } from './claim-summary/claim-summary.component';


const routes: Routes = [
  {
    path: '',
    component: ClaimSummaryComponent
  },

  {
    path: 'diagnosis',
    loadChildren: './diagnosis/diagnosis.module#DiagnosisModule'
  },
  { path: 'info', component: ClaimInfoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClaimManagementRoutingModule { }
