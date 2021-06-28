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
import { NotFoundComponent } from './not-found/not-found.component';
import { MapComponent } from '../../shared/map/map.component';
import { CarouselComponent } from './description/description/carousel/carousel.component';
import { NgbCarouselModule, NgbRatingModule, NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import { DialogComponent } from '../../shared/dialog/dialog/dialog.component';
import { MatDialogModule } from "@angular/material/dialog";
import { LocationTreeComponent } from './head/location-tree/location-tree.component';
import { MatTreeModule } from "@angular/material/tree";

@NgModule({
    declarations: [
        HeadComponent,
        HomeComponent,
        DescriptionComponent,
        ProfileComponent,
        StatisticComponent,
        VendorComponent,
        NotFoundComponent,
        MapComponent,
        CarouselComponent,
        DialogComponent,
        LocationTreeComponent
    ],
    exports: [
        MapComponent
    ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    HeadRoutingModule,
    NgbCarouselModule,
    NgbRatingModule,
    MatDialogModule,
    NgbTooltipModule,
    MatTreeModule,
  ],
})
export class HeadModule { }
