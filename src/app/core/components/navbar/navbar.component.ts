import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { faBars, faCoffee } from '@fortawesome/free-solid-svg-icons';
import {
  faFacebookSquare,
  faInstagramSquare,
  faTwitter,
  faTwitterSquare,
} from '@fortawesome/free-brands-svg-icons';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../guards/auth/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  // props
  fabars = faBars;
  active = 1;
  faCoffee = faCoffee;
  faTwitter = faTwitter;
  token: any;
  isLoggedIn$: Observable<boolean>; // {1}

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.fetchToken();
    this.isLoggedIn$ = this.authService.isLoggedIn;
    console.log(this.isLoggedIn$);
  }
  fetchToken() {
    this.token = localStorage.getItem('token');
  }

  onLogout() {
    this.authService.logout();
  }
}
