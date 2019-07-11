import { NgModule, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';

// Development artifacts
import { NotificationService } from './notification.service';
import { AuthtenticationService } from './authtentication.service';
import { ModalService } from './modal.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [],
  providers: [
    AuthtenticationService,
    ModalService,
    NotificationService,
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('WARNING: Core is already loaded, please check you code.');
    }
  }
}
