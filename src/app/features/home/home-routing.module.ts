import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'register',
        loadChildren: () =>
          import('../register/register.module').then((m) => m.RegisterModule),
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'register/letter-list',
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'register/letter-list',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
