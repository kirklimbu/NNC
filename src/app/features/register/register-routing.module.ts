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
  {
    path: 'letter-list',
    component: RegisteredListComponent,
  },
  {
    path: 'verify/:id',
    component: RegisterFormComponent,
  },
  {
    path: 'print-letter',
    component: PrintLetterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterRoutingModule {}
