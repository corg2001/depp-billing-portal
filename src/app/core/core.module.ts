import { NgModule, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

// Development artifacts
import { AuthenticationService } from './authentication.service';
import { LoggerService } from './logger.service';
import { LogoutService } from './logout.service';
import { ModalService } from './modal.service';
import { NotificationService } from './notification.service';
import { PartyService } from './party.service';


import { TokenHttpInterceptor } from './token.interceptor';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [],
  providers: [
    AuthenticationService,
    LoggerService,
    LogoutService,
    ModalService,
    NotificationService,
    PartyService,
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
