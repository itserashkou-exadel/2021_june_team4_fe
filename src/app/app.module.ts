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
import { uiConfigReducer } from './core/store/redeucers/ui-config.reducer';
import { descriptionReducer } from "./core/store/redeucers/discription.reducer";
import { DescriptionEffects } from "./core/store/description.effects";
import { EffectsModule } from "@ngrx/effects";
import { DescriptionService } from "./core/store/description.service";

@NgModule({
  imports: [

    StoreModule.forRoot({
      head : headReducer,
      uiConfig: uiConfigReducer,
      description: descriptionReducer }),
    EffectsModule.forRoot([DescriptionEffects]),
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
  providers: [
    authInterceptorProviders,
    DescriptionService,
    MarkerService],
  entryComponents: [//for dynamical load components
    DialogComponent,
    MapComponent,
    LocationTreeComponent
  ]
})
export class AppModule {}

