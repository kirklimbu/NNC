import { VerifyLetterComponent } from './pages/verify-letter/verify-letter.component';
import { AuthGuardService } from './../../core/guards/auth/auth-guard.service';
import { PrintLetterComponent } from './pages/print-letter/print-letter.component';
import { RegisterFormComponent } from './shared/register-form/register-form.component';
import { RegisteredListComponent } from './pages/registered-list/registered-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: RegisterFormComponent,
  },
  /* {
    path: 'edit-letter',
    component: RegisterFormComponent,
  }, */
  {
    path: 'letter-list',
    component: RegisteredListComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'verify/detail',
    component: VerifyLetterComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'print-letter',
    component: PrintLetterComponent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterRoutingModule {}
