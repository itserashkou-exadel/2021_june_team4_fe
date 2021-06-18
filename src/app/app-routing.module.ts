import { NgModule } from '@angular/core';
import { RouterModule, Routes, ActivatedRoute } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/login/login.module').then((m) => m.LoginModule)
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./features/home/home.module').then((m) => m.HomeModule)
  },
  {
    path: 'description',
    loadChildren: () =>
      import('./features/description/description.module').then((m) => m.DescriptionModule)
  },
  {
    path: 'vendor',
    loadChildren: () =>
      import('./features/vendor/vendor.module').then((m) => m.VendorModule)
  },
  {
    path: 'statistic',
    loadChildren: () =>
      import('./features/statistic/statistic.module').then((m) => m.StatisticModule)
  },
  {
    path: '**', //if route not found -> redirect to main
    redirectTo: ''
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
