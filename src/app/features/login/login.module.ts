import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { StaffLoginComponent } from './staff-login/staff-login.component';
import { MaterialLibModule } from 'src/app/core/material-lib/material-lib.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [StaffLoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    MaterialLibModule,
    ReactiveFormsModule,
  ],
  exports: [StaffLoginComponent],
})
export class LoginModule {}
