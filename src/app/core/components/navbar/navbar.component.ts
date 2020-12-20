import { LoginService } from './../../../features/login/services/login.service';
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
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  // props

  token = '';
  isLoggedIn$: Observable<boolean>;
  constructor(private router: Router, private loginService: LoginService) {}

  ngOnInit(): void {
    this.fetchToken();

    this.isLoggedIn$ = this.loginService.isLoggedIn;
    console.log(JSON.stringify(this.isLoggedIn$));
  }
  fetchToken() {
    this.token = localStorage.getItem('token');
  }

  onLogout() {
    this.loginService.logout();
  }
}
