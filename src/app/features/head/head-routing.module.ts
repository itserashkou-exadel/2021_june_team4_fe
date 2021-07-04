import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HeadComponent } from './head/head.component';
import { VendorComponent } from "./vendor/vendor/vendor.component";
import { StatisticComponent } from "./statistic/statistic/statistic.component";
import { ProfileComponent } from "./profile/profile/profile.component";
import { DescriptionComponent } from "./description/description.component";
import { HomeComponent } from "./home/home/home.component";

const routes: Routes = [
  {
    path: '',
    component: HeadComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'home/:id/description',
        component: DescriptionComponent,
      },
      {
        path: 'vendor',
        component: VendorComponent,
      },
      {
        path: 'statistic',
        component: StatisticComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeadRoutingModule {}
