import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {AUTHORIZATION_REDUCER_NODE, authorizationReducer} from "./authorization/authorization.reducer";
import {RouterModule} from "@angular/router";

import { MatFormFieldModule } from '@angular/material/form-field';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher} from "@angular/material/core";
import { MatInputModule } from "@angular/material/input";
import { ReactiveFormsModule } from "@angular/forms";
import { MatCardModule } from '@angular/material/card';

import { LoginComponent } from './authorization/login/login.component';
import { HomeComponent } from './home/home.component';
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(AUTHORIZATION_REDUCER_NODE, authorizationReducer),
    // RouterModule.forChild([
    //   {
    //     path: '',
    //     component: LoginComponent
    //   }
    // ]),
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    RouterModule,
    MatButtonModule
  ],
  providers: [
    // {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}
  ]
})
export class AuthorizationModule { }
