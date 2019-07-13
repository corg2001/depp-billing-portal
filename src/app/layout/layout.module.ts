import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Development Artifacts
import { PublicLayoutComponent } from './public-layout/public-layout.component';
import { PrivateLayoutComponent } from './private-layout/private-layout.component';
import { BaseLayoutComponent } from './base-layout/base-layout.component';


@NgModule({
  declarations: [
    PublicLayoutComponent,
    PrivateLayoutComponent,
    BaseLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    PublicLayoutComponent,
    PrivateLayoutComponent
  ]
})
export class LayoutModule { }
