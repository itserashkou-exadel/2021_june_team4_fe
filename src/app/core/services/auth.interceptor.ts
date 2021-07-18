import { HTTP_INTERCEPTORS, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import {Observable, of, throwError} from "rxjs";

import { TokenStorageService } from './token-storage.service';
import { NotificationService } from "./notification.service";
import {AuthService} from "./auth.service";

const TOKEN_HEADER_KEY = 'Authorization'; // for Spring Boot back-end

@Injectable()
// Function for adding token to http request
export class AuthInterceptor implements HttpInterceptor {
  constructor(private token: TokenStorageService,
              private notification: NotificationService,
              private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let authReq = req;
    const token = this.token.getToken();
    if (token != null && !authReq.url.includes('localhost:3000')) {
      authReq = req.clone({
        headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token),
      });
      if (authReq.url.endsWith('/authenticate/refresh')) {
        //header for refresh access token
        const refreshToken = window.sessionStorage.getItem('refreshToken');
        authReq = req.clone({
          headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + refreshToken),
        });
      }
    }
    return next.handle(authReq).pipe(
      catchError((error) => {
        console.log('error is intercept')
        this.notification.error(error.message);
        if(error.status === 401) {//todo maybe 401/403 status code?
          this.auth.logout();
        }

        return throwError(error.message);
      })
    )

  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];
