import {HTTP_INTERCEPTORS} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

// Development artifacts
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { ModalComponent } from './shared/modal/modal.component';
import { TestComponent } from './test/test.component';
import {MaintenanceInterceptor} from './core/maintenance.interceptor.service';
import {MaintenanceService} from './core/maintenance.service'
import { IdleTimeComponent } from './shared/components/idle-time/idle-time.component';
@NgModule({
  declarations: [AppComponent, TestComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    CoreModule,
    SharedModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MaintenanceInterceptor,
      multi: true
    },
    MaintenanceService
  ],  
  entryComponents: [ModalComponent, IdleTimeComponent],
  bootstrap: [AppComponent],
})
export class AppModule { }
