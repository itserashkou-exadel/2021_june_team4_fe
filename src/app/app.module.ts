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
import { DialogComponent } from "./shared/dialog/dialog/dialog.component";

import { DescriptionService } from "./core/services/description.service";
import { MapComponent } from "./shared/map/map.component";
import { LocationTreeComponent } from "./features/head/head/location-tree/location-tree.component";
import { DescriptionEffects } from "./core/store/effects/description.effects";
import { EffectsModule } from "@ngrx/effects";
import { HomeEffects } from './core/store/effects/home.effects';
import { FilterEffects } from './core/store/effects/filter.effects';
import { homeReducer } from './core/store/redeucers/home.reducer';
import { uiConfigReducer } from './core/store/redeucers/ui-config.reducer';
import { descriptionReducer } from "./core/store/redeucers/discription.reducer";
import { filterReducer } from './core/store/redeucers/filter.reducer';
import { headReducer } from "./core/store/redeucers/head.reducer";
import { notificationsReducer } from './core/store/redeucers/notifications.reducer';
import { NotificationsEffects } from './core/store/effects/notifications.effects';
import { vendorReducer } from './core/store/redeucers/vendor.reducer';
import { profileReducers } from './core/store/redeucers/profile.reducer';

@NgModule({
  imports: [

    StoreModule.forRoot({
      head: headReducer,
      home: homeReducer,
      uiConfig: uiConfigReducer,
      description: descriptionReducer,
      filter: filterReducer,
      notifications: notificationsReducer,
      vendor: vendorReducer,
      profile: profileReducers,
    }),
    EffectsModule.forRoot([DescriptionEffects, HomeEffects, FilterEffects, NotificationsEffects]),
    // angular
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,

    // core
    CoreModule,

    // app
    AppRoutingModule,
    NgbModule,
  ],
  declarations: [
    AppComponent,
    // FilterPipe
  ],
  bootstrap: [AppComponent],
  providers: [
    authInterceptorProviders,
    DescriptionService],
  entryComponents: [//for dynamical load components
    DialogComponent,
    MapComponent,
    LocationTreeComponent,
  ]
})
export class AppModule {}

