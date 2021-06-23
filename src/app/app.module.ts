import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { authInterceptorProviders } from '../app/_helpers/auth.interceptor';

import { CoreModule } from './core/core.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/app.component';

@NgModule({
  imports: [
    // angular
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,

    // core
    CoreModule,

    // app
    AppRoutingModule
  ],
  // exports:[ HomeModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [authInterceptorProviders]
})
export class AppModule {}

