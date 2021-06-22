import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { CoreModule } from './core/core.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from "@angular/common/http";
import { MarkerService } from "./features/head/home/home/map/marker.service";

@NgModule({
  imports: [
    // angular
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule,

    // core
    CoreModule,

    // app
    AppRoutingModule,
      NgbModule
  ],
  // exports:[ HomeModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [
    MarkerService
  ]
})
export class AppModule {}

