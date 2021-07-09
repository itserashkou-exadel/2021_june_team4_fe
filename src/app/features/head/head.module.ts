import { NgModule } from '@angular/core';
import { SharedModule } from "../../shared/shared.module";
import { CommonModule } from '@angular/common';
import { HomeComponent } from "./home/home/home.component";
import { DescriptionComponent } from "./description/description.component";
import { ProfileComponent } from "./profile/profile/profile.component";
import { StatisticComponent } from "./statistic/statistic/statistic.component";
import { VendorComponent } from "./vendor/vendor/vendor.component";
import { HeadComponent } from "./head/head.component";
import { RouterModule } from "@angular/router";
import { HeadRoutingModule } from "./head-routing.module";
import { NotFoundComponent } from './not-found/not-found.component';
import { MapComponent } from '../../shared/map/map.component';
import { CarouselComponent } from './description/carousel/carousel.component';
import { NgbCarouselModule, NgbRatingModule, NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import { DialogComponent } from '../../shared/dialog/dialog/dialog.component';

import { FooterComponent } from 'src/app/shared/footer/footer.component';

import { MatDialogModule } from "@angular/material/dialog";
// import { DialogContentComponent } from './description/description/dialog/dialog-content/dialog-content.component';
import { LocationTreeComponent } from './head/location-tree/location-tree.component';
import { MatTreeModule } from "@angular/material/tree";
import { SideBarFilterComponent } from './home/home/side-bar-filter/side-bar-filter.component';
import { CategoryComponent } from './home/home/side-bar-filter/category/category.component';
import { DateComponent } from './home/home/side-bar-filter/date/date.component';
import { RangeComponent } from './home/home/side-bar-filter/range/range.component';
import { TagsComponent } from './home/home/side-bar-filter/tags/tags.component';
import {StepperWrapperComponent} from "./stepper/stepper-wrapper/stepper-wrapper.component";
import {StepCreateVendorComponent} from "./stepper/step-create-vendor/step-create-vendor.component";
import {StepCreateBpComponent} from "./stepper/step-create-bp/step-create-bp.component";
import {StepEditBpComponent} from "./stepper/step-edit-bp/step-edit-bp.component";

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
        // DialogContentComponent,
        StepperWrapperComponent,
        StepCreateVendorComponent,
        StepCreateBpComponent,
        StepEditBpComponent,
        LocationTreeComponent,
        SideBarFilterComponent,
        CategoryComponent,
        DateComponent,
        RangeComponent,
        TagsComponent
        
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
    MatTreeModule
  ],
})
export class HeadModule { }
