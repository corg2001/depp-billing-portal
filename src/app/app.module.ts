import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Development artifacts
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { ModalComponent } from './shared/modal/modal.component';
import { TestComponent } from './test/test.component';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    CoreModule,
    SharedModule,
  ],
  providers: [],
  entryComponents: [
    ModalComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
