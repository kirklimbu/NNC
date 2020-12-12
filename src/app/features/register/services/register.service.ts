import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  /* props */
  API_URL = environment.apiUrl;
  constructor(private http: HttpClient) {}

  register(register): any {
    console.log('student save service' + JSON.stringify(register));

    return this.http.post(`${this.API_URL}letter/save`, { ...register });
    // .pipe(
    //   catchError(err => {
    //     return Observable.throw(err);
    //   })
    // )
  }
}
