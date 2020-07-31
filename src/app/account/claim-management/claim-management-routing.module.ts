import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClaimSummaryComponent } from './claim-summary/claim-summary.component';


const routes: Routes = [
  {
    path: '',
    component:  ClaimSummaryComponent
  },

  {
    path: 'diagnosis',
    loadChildren: './diagnosis/diagnosis.module#DiagnosisModule'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClaimManagementRoutingModule { }
