import { NgModule } from '@angular/core';
import { SharedModule } from "../../shared/shared.module";
import { CommonModule } from '@angular/common';
import { HomeComponent } from "./home/home/home.component";
import { DescriptionComponent } from "./description/description/description.component";
import { ProfileComponent } from "./profile/profile/profile.component";
import { StatisticComponent } from "./statistic/statistic/statistic.component";
import { VendorComponent } from "./vendor/vendor/vendor.component";
import { HeadComponent } from "./head/head.component";
import { RouterModule } from "@angular/router";
import { HeadRoutingModule } from "./head-routing.module";

@NgModule({
  declarations: [
    HeadComponent,
    HomeComponent,
    DescriptionComponent,
    ProfileComponent,
    StatisticComponent,
    VendorComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    HeadRoutingModule
  ]
})
export class HeadModule { }