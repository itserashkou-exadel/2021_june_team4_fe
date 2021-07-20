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
import { MatDialogModule } from "@angular/material/dialog";
import { MatTreeModule } from "@angular/material/tree";
import { SideBarFilterComponent } from './home/home/side-bar-filter/side-bar-filter.component';
import { CategoryComponent } from './home/home/side-bar-filter/category/category.component';
import { DateComponent } from './home/home/side-bar-filter/date/date.component';
import { RangeComponent } from './home/home/side-bar-filter/range/range.component';
import { TagsComponent } from './home/home/side-bar-filter/tags/tags.component';
import { StepperWrapperComponent } from "./stepper/stepper-wrapper/stepper-wrapper.component";
import { StepCreateVendorComponent } from "./stepper/step-create-vendor/step-create-vendor.component";
import { StepCreateBpComponent } from "./stepper/step-create-bp/step-create-bp.component";
import { StepEditBpComponent } from "./stepper/step-edit-bp/step-edit-bp.component";
import { FilterPipe } from 'src/app/core/pipes/filter.pipe';

import { MissingTranslationService } from '../../core/services/missing-translation.service';
import { HttpClient } from "@angular/common/http";
import {
  MissingTranslationHandler,
  TranslateLoader,
  TranslateModule
} from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateLoader {
  return new TranslateHttpLoader(http, './assets/locale/', '.json');
}

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
    SideBarFilterComponent,
    CategoryComponent,
    DateComponent,
    RangeComponent,
    TagsComponent,
    StepperWrapperComponent,
    StepCreateVendorComponent,
    StepCreateBpComponent,
    StepEditBpComponent,
    FilterPipe,
  ],
  exports: [
    MapComponent,
    StepCreateVendorComponent
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
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
            },
            missingTranslationHandler: {provide: MissingTranslationHandler, useClass: MissingTranslationService},
            useDefaultLang: false,
        }),
    ],
})
export class HeadModule { }
