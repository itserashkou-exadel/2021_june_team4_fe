import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { CoreModule } from './core/core.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/app.component';

import { StoreModule } from '@ngrx/store';
import { headReducer } from './core/store/redeucers/head.reducer';

@NgModule({
  imports: [

    StoreModule.forRoot({ head : headReducer}),
    // angular
    BrowserAnimationsModule,
    BrowserModule,

    // core
    CoreModule,

    // app
    AppRoutingModule
  ],
  // exports:[ HomeModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}

