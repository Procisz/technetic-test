import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExtraOptions, PreloadAllModules } from '@angular/router';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { HttpClientModule } from '@angular/common/http';

const routerConfig: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  enableTracing: false,
  preloadingStrategy: PreloadAllModules,
};

@NgModule({
  declarations: [AppComponent, LayoutComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
