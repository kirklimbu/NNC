import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  /* props */
  API_URL = environment.apiUrl;
  constructor(private http: HttpClient) {}

  register(register): any {
    // console.log('student save service' + JSON.stringify(register));

    return this.http.post(`${this.API_URL}letter/save`, { ...register }).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  getLetterForm(): any {
    return this.http.get(`${this.API_URL}letter/form`).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  }
  getLetterList(): any {
    return this.http.get(`${this.API_URL}verify/list`).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  }
  getFilteredLetters(status): any {
    return this.http.get(`${this.API_URL}verify/list`).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  }
}
