import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClaimTestComponent } from './claim-test/claim-test.component';

const routes: Routes = [
  {
    path: '',
    component: ClaimTestComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClaimManagementRoutingModule { }
