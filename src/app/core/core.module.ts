import { NgModule, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';

// Development artifacts
import { NotificationService } from './notification.service';
import { AuthenticationService } from './authentication.service';
import { ModalService } from './modal.service';
import { LogoutService } from './logout.service';
import { TokenHttpInterceptor } from './token.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

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
    LogoutService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenHttpInterceptor, multi: true }
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('WARNING: Core is already loaded, please check you code.');
    }
  }
}
