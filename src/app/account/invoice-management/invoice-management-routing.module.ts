import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvoiceHistoryComponent } from './invoice/invoice-history.component';

const routes: Routes = [
  {
    path: '',
    component: InvoiceHistoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceManagementRoutingModule { }
