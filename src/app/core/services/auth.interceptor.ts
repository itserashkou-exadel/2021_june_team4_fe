import { HTTP_INTERCEPTORS, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import {catchError, delay, tap} from 'rxjs/operators';

import { TokenStorageService } from './token-storage.service';
import { NotificationService } from "./notification.service";
import { AuthService } from "./auth.service";
import { SpinnerService } from "./spinner.service";

const TOKEN_HEADER_KEY = 'Authorization'; // for Spring Boot back-end

// Function for adding token to http request
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private token: TokenStorageService,
              private notification: NotificationService,
              private auth: AuthService,
              private spinner: SpinnerService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinner.showSpinner();
    let authReq = req;
    const token = this.token.getToken();

    if (token != null){
      authReq = req.clone({headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token)})
      if(authReq.url.endsWith('/authenticate/refresh') ){
        const refreshToken = window.sessionStorage.getItem('refreshToken');
        authReq = req.clone({headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + refreshToken)})
        return next.handle(authReq)
      }
    }
    return next.handle(authReq).pipe(
      delay(0),
      tap(
      event => {
        if(event instanceof HttpResponse) {
          this.spinner.hideSpinner();
        }
      }),
      catchError((error: HttpErrorResponse) => {
        this.spinner.hideSpinner();
        let errorMessage = `Error: ${error.error.message}`;
        this.notification.error(errorMessage);
        if(error.status === 401) {
          this.auth.logout();
        }
        return throwError(errorMessage);
      })
    )
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];
