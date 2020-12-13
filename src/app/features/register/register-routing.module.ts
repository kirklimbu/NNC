import { RegisterFormComponent } from './shared/register-form/register-form.component';
import { RegisteredListComponent } from './pages/registered-list/registered-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: RegisteredListComponent,
  },
  {
    path: 'add-letter',
    component: RegisterFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterRoutingModule {}
