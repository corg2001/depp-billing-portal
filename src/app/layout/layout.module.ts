import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Development Artifacts
import { PublicLayoutComponent } from './public-layout/public-layout.component';
import { PrivateLayoutComponent } from './private-layout/private-layout.component';
import { BaseLayoutComponent } from './base-layout/base-layout.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { FooterLinksComponent } from './footer/footer-links/footer-links.component';


@NgModule({
  declarations: [
    PublicLayoutComponent,
    PrivateLayoutComponent,
    BaseLayoutComponent,
    MenuComponent,
    FooterComponent,
    FooterLinksComponent
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
