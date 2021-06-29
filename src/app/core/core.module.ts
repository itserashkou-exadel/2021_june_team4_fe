import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";

import { AuthGuard } from './auth/auth-guard.service';
 export {
   AuthGuard
 }
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  providers: []
})
export class CoreModule { }
