import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { provideAppInitializer, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

// Development artifacts
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { TestComponent } from './test/test.component';
import { MaintenanceInterceptor } from './core/maintenance.interceptor.service';
import { IdleTimeComponent } from './shared/components/idle-time/idle-time.component';
import { ConfigCatService } from './shared/service/config-cat.service';

function initializeDynatrace(configCatService: ConfigCatService): () => Promise<void> {
  return async () => {
    try {
      const dynatraceSrc = await firstValueFrom(configCatService.getDynatraceSrc());
      
      if (!dynatraceSrc?.trim()) {
        console.warn('[Dynatrace] No dynatrace source URL found.');
        return;
      }

      let script = document.getElementById('dynatrace-script') as HTMLScriptElement | null;
      
      if (!script) {
        script = document.createElement('script');
        script.id = 'dynatrace-script';
        script.type = 'text/javascript';
        document.head.prepend(script);
      }
      
      script.async = true;
      script.crossOrigin = 'anonymous';
      script.src = dynatraceSrc.trim();
      console.log('[Dynatrace] Script initialized before app load');
    } catch (error) {
      console.error('[Dynatrace] Failed to load Dynatrace script:', error);
    }
  };
}

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
    provideAppInitializer(() => {
      const configCatService = inject(ConfigCatService);
      return initializeDynatrace(configCatService)();
    }),
    ConfigCatService
  ],

  bootstrap: [AppComponent],
})
export class AppModule { }
