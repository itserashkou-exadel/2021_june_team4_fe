import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { authInterceptorProviders } from '../app/_helpers/auth.interceptor';

import { CoreModule } from './core/core.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from "@angular/common/http";
import { MarkerService } from "./shared/map/marker.service";

import { StoreModule } from '@ngrx/store';
import { headReducer } from './core/store/redeucers/head.reducer';
import { DialogComponent } from "./shared/dialog/dialog/dialog.component";
import { MapComponent } from "./shared/map/map.component";
import { LocationTreeComponent } from "./features/head/head/location-tree/location-tree.component";


@NgModule({
  imports: [

    StoreModule.forRoot({ head : headReducer}),
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
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [authInterceptorProviders, MarkerService],
  entryComponents: [//for dynamical load components
    DialogComponent,
    MapComponent,
    LocationTreeComponent
  ]
})
export class AppModule {}

