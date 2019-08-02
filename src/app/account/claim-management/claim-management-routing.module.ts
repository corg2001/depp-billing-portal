import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClaimSummaryComponent } from './claim-summary/claim-summary.component';


const routes: Routes = [
  {
    path: '',
    component:  ClaimSummaryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClaimManagementRoutingModule { }
