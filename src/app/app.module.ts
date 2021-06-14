// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { StoreModule } from '@ngrx/store';
// import { environment } from '../environment/environment';
// import { StoreDevtoolsModule } from '@ngrx/store-devtools';
// import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
// import { RouterModule } from "@angular/router";
// import { EffectsModule } from '@ngrx/effects';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MatToolbarModule } from "@angular/material/toolbar";
// import { MatMenuModule } from "@angular/material/menu";
// import { MatIconModule } from "@angular/material/icon";
//
// import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './app/app.component';
//
//
//
// @NgModule({
//   declarations: [
//     AppComponent
//   ],
//   imports: [
//     BrowserModule,
//     AppRoutingModule,
//     StoreModule.forRoot({
//       router: routerReducer,
//     }),
//     RouterModule.forRoot([
//       {
//         path: '**', //if route not found -> redirect to main ''
//         redirectTo: ''
//       }
//     ]),
//     // Connects RouterModule with StoreModule, uses MinimalRouterStateSerializer by default
//     StoreRouterConnectingModule.forRoot(),
//     StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
//     BrowserAnimationsModule,
//     AuthorizationModule,
//     MatToolbarModule,
//     MatMenuModule,
//     MatIconModule,
//     EffectsModule.forRoot([])
//   ],
//   providers: [],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { CoreModule } from './core/core.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/app.component';

@NgModule({
  imports: [
    // angular
    BrowserAnimationsModule,
    BrowserModule,

    // core
    CoreModule,

    // app
    AppRoutingModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}

