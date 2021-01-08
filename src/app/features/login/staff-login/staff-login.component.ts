import { OnreturnDirective } from './../../../core/directives/onreturn.directive';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { User } from 'src/app/core/models/user.model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-staff-login',
  templateUrl: './staff-login.component.html',
  styleUrls: ['./staff-login.component.scss'],
})
export class StaffLoginComponent implements OnInit {
  // props
  user = new User();
  staffLoginForm: FormGroup;
  loginInvalid = false;
  formSubmitted = false;
  errorMsg = '';
  hide = true;
  show = true;
  loading = false;
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buildStaffLoginForm();
  }

  buildStaffLoginForm() {
    this.staffLoginForm = this.fb.group({
      userName: [this.user.userName, [Validators.required]],
      passWord: [this.user.passWord, [Validators.required]],
    });
  }

  get f() {
    return this.staffLoginForm.controls;
  }

  get username() {
    return this.staffLoginForm.get('userName');
  }
  get pwd() {
    return this.staffLoginForm.get('passWord');
  }

  login() {
    this.formSubmitted = true;
    this.loading = true;
    if (this.staffLoginForm.valid && this.formSubmitted) {
      this.loginService
        .login(this.f.userName.value, this.f.passWord.value)
        .subscribe(
          (res) => {
            this.loading = false;

            this.loggedIn.next(true);
            this.router.navigate(['home/register/letter-list']);
          },
          (err) => {
            err.status == 400
              ? (this.errorMsg = err.error.message || err.error.errors[0])
              : (this.errorMsg = 'Login Failed');
            this.loading = false;
          }
        );
    }
  }

  /* Error messages */
  getUsernameErrorMsg() {
    return this.staffLoginForm.controls.userName.hasError('required')
      ? 'Username is required.'
      : '';
  }
  getPassErrorMsg() {
    return this.staffLoginForm.controls.passWord.hasError('required')
      ? 'Password is required.'
      : '';
  }
}
