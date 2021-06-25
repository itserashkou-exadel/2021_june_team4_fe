import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { authInterceptorProviders } from '../app/_helpers/auth.interceptor';

import { CoreModule } from './core/core.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from "@angular/common/http";
import { MarkerService } from "./features/head/home/home/map/marker.service";

import { StoreModule } from '@ngrx/store';
import { headReducer } from './core/store/redeucers/head.reducer';
import { configReducer } from './core/store/redeucers/config.reducer';

@NgModule({
  imports: [

    StoreModule.forRoot({ head : headReducer, config: configReducer }),
    // angular
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,

    // core
    CoreModule,

    // app
    AppRoutingModule,
      NgbModule
  ],
  // exports:[ HomeModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [authInterceptorProviders, MarkerService]
})
export class AppModule {}

