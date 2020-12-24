import { ToastrModule } from 'ngx-toastr';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor, JwtModule } from '@auth0/angular-jwt';
import { JtwTokenInterceptorService } from './core/interceptor/jtw-token-interceptor.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxSpinnerComponent } from './shared/components/ngx-spinner/ngx-spinner.component';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome/fontawesome.module';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [AppComponent, NgxSpinnerComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    // FontAwesomeModule,
    HttpClientModule,
    NgxSpinnerModule,

    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      autoDismiss: true,
      closeButton: true,
      progressBar: true,
      progressAnimation: 'increasing',
    }),
    JwtModule.forRoot({
      config: {
        // ...
        tokenGetter: () => {
          return localStorage.getItem('token');
        },
        throwNoTokenError: true,
      },
      /*  config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:8084', '52.15.190.182:8084'],
        disallowedRoutes: ['http://example.com/examplebadroute/'],
      }, */
    }),
  ],

  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JtwTokenInterceptorService,
      multi: true,
    },
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],

  bootstrap: [AppComponent],
})
export class AppModule {}
