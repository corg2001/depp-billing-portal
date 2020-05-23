import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataLossGuard } from './../../data-loss.guard';
import { DiagnosisFormComponent } from './diagnosis-form/diagnosis-form.component';

const routes: Routes = [
  {
    path: ':formType',
    component: DiagnosisFormComponent,
    canDeactivate: [DataLossGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiagnosisRoutingModule { }
