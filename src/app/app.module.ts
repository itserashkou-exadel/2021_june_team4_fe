import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { authInterceptorProviders } from './core/services/auth.interceptor';


import { CoreModule } from './core/core.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from "@angular/common/http";

import { StoreModule } from '@ngrx/store';
import { headReducer } from './core/store/redeucers/home.reducer';

import { DialogComponent } from "./shared/dialog/dialog/dialog.component";
import { MapComponent } from "./shared/map/map.component";

import { FooterComponent } from './shared/footer/footer.component';

import { LocationTreeComponent } from "./features/head/head/location-tree/location-tree.component";
import { uiConfigReducer } from './core/store/redeucers/ui-config.reducer';
import { descriptionReducer } from "./core/store/redeucers/discription.reducer";
import { DescriptionEffects } from "./core/store/effects/description.effects";
import { EffectsModule } from "@ngrx/effects";
import { DescriptionService } from "./core/services/description.service";
import { HomeEffects } from './core/store/effects/home.effects';
import { filterReducer } from './core/store/redeucers/filter.reducer';


@NgModule({
  imports: [

    StoreModule.forRoot({
      home : headReducer,
      uiConfig: uiConfigReducer,
      description: descriptionReducer,
      filter: filterReducer
    }),
    EffectsModule.forRoot([DescriptionEffects, HomeEffects]),
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
    DescriptionService],
  entryComponents: [//for dynamical load components
    DialogComponent,
    MapComponent,
    LocationTreeComponent
  ]
})
export class AppModule {}

