import { HTTP_INTERCEPTORS, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { catchError, tap } from 'rxjs/operators';

import { TokenStorageService } from './token-storage.service';
import { NotificationService } from "./notification.service";
import { AuthService } from "./auth.service";
import { SpinnerService } from "./spinner.service";

const TOKEN_HEADER_KEY = 'Authorization'; // for Spring Boot back-end

@Injectable()
// Function for adding token to http request
export class AuthInterceptor implements HttpInterceptor {
  constructor(private token: TokenStorageService,
              private notification: NotificationService,
              private auth: AuthService,
              private spinner: SpinnerService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinner.showSpinner();
    let authReq = req;
    const token = this.token.getToken();

    if (token != null && !authReq.url.includes('localhost:3000')){
      authReq = req.clone({headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token)})
      if(authReq.url.endsWith('/authenticate/refresh') ){
        const refreshToken = window.sessionStorage.getItem('refreshToken');
        authReq = req.clone({headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + refreshToken)})
        return next.handle(authReq)
      }
    }
    return next.handle(authReq).pipe(tap(
      event => {
          this.spinner.hideSpinner();
      }),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = `Error: ${error.error.message}`;
        this.spinner.hideSpinner();
        this.notification.error(errorMessage);
        if(error.status === 403) {//todo maybe 401/403 status code?
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
