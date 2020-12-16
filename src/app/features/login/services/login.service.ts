import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { User } from 'src/app/core/models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  // we can now access environment.apiUrl
  API_URL = environment.apiUrl;
  constructor(private http: HttpClient) {
    // console.log(environment.production); // Logs false for default environment
  }

  login(userName: string, passWord: string): any {
    return this.http
      .post<User>(this.API_URL + 'staff/login', {
        userName,
        passWord,
      })
      .pipe(
        map((res) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('token', res.token);
        })
      );
  }
}
