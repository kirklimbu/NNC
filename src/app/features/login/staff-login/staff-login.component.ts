import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { User } from 'src/app/core/models/user.model';

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
      username: [this.user.userName, [Validators.required]],
      password: [this.user.password, [Validators.required]],
    });
  }

  get f() {
    return this.staffLoginForm.controls;
  }

  get username() {
    return this.staffLoginForm.get('username');
  }
  get pwd() {
    return this.staffLoginForm.get('password');
  }

  login() {
    console.log('clicked');
    this.formSubmitted = true;
    this.loading = true;
    if (this.staffLoginForm.valid && this.formSubmitted) {
      this.loginService
        .login(this.f.username.value, this.f.password.value)
        .subscribe(
          (res) => {
            this.router.navigate(['/home/register']);
          },
          (err) => {
            console.log('login error ' + JSON.stringify(err));

            err.status == 401
              ? (this.errorMsg = err.error.message)
              : (this.errorMsg = 'Login Failed');
            /*  this.loginInvalid = true;
            if (err.status == 401) {
              this.errorMsg = err.error.message;
            } else {
              console.log("error " + JSON.stringify(err));

              this.loginInvalid = true;
              this.errorMsg = "Login Failed";
            } */
          }
        );
    }
  }

  /* Error messages */
  getUsernameErrorMsg() {
    return this.staffLoginForm.controls.username.hasError('required')
      ? 'Username is required.'
      : '';
  }
  getPassErrorMsg() {
    return this.staffLoginForm.controls.password.hasError('required')
      ? 'Password is required.'
      : '';
  }
}
