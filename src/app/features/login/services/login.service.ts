import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/core/models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  /* props */
  // we can now access environment.apiUrl
  API_URL = environment.apiUrl;
  isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {
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
          this.isLoggedIn.next(true);
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    // localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.isLoggedIn.next(false);
    // this.userSubject.next(null);
    this.router.navigate(['/home/letter']);
  }
}
