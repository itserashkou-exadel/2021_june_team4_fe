import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
