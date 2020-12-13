import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserRoleGuardService {
  currentUser
  //  User = new User(); // ya milaune
  constructor(
    // private userDetailService: UserDetailService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // return this.userDetailService.fetchUser().pipe(
    //   map(res => {
    //     if (next.data.allowedRoles.includes(res.result.userRole)) {
    //       return true;
    //     } else {
    //       this.router.navigate(['404']);
    //       return false;
    //     }
    //   })
    // );
    this.currentUser = JSON.parse(localStorage.getItem('loggedUser'));
    if (
      next.data.allowedRoles.includes(this.currentUser.role) ||
      next.data.allowedRoles.includes('ALL')
    ) {
      return true;
    } else {
      this.router.navigate(['404']);
    }
  }
}
