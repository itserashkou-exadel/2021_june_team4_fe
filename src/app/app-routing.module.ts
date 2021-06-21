import { NgModule } from '@angular/core';
import { RouterModule, Routes, ActivatedRoute } from '@angular/router';

import { AuthGuardService } from '../app/core/core.module';
import { NotFoundComponent } from "../app/features/head/not-found/not-found.component";


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
    path: '',
    loadChildren: () =>
      import('./features/head/head.module').then((m) => m.HeadModule),
    canActivate: [AuthGuardService]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
