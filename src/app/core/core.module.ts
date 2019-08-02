import { NgModule, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';

// Development artifacts
import { NotificationService } from './notification.service';
import { AuthenticationService } from './authentication.service';
import { ModalService } from './modal.service';
import { LogoutService } from './logout.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [],
  providers: [
    AuthenticationService,
    ModalService,
    NotificationService,
    LogoutService
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('WARNING: Core is already loaded, please check you code.');
    }
  }
}
