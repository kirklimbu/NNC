import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../guards/auth/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class JtwTokenInterceptorService implements HttpInterceptor {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (localStorage.getItem('token') == null) {
      return next.handle(request);
      //Code to add Authorization header
    } else {
      if (this.authService.isAuthenticated()) {
        request = request.clone({
          setHeaders: {
            Authorization: localStorage.getItem('token'),
          },
        });
        return next.handle(request);
      } else {
        localStorage.clear();
        return next.handle(request);
      }
    }
  }
}
