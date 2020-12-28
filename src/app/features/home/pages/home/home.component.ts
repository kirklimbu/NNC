import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/features/login/services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  // props
  isLoggedIn$: Observable<boolean>;
  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.loginService.isLoggedIn;
  }
}
