import { NgModule } from '@angular/core';
import { RouterModule, Routes, ActivatedRoute } from '@angular/router';

import { AuthGuardService } from '../app/core/core.module';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./features/login/login.module').then((m) => m.LoginModule)
  },
  {
    path: 'head',
    loadChildren: () =>
      import('./features/head/head.module').then((m) => m.HeadModule),
    canActivate: [AuthGuardService]
  },
  {
    path: '**',
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
