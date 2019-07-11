import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  {
    path: 'test',
    component: TestComponent,
  },
  {
    path: 'user',
    loadChildren: './user/user.module#UserModule'
  },
  {
    path: 'account',
    loadChildren: './account/account.module#AccountModule'
  },
  { path: '', pathMatch: 'full', redirectTo: 'account' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
