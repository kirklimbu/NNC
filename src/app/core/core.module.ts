import { MaterialLibModule } from './material-lib/material-lib.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { ContentwrapperComponent } from './components/contentwrapper/contentwrapper.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { OnreturnDirective } from './directives/onreturn.directive';

const DECLARATIONS = [
  NavbarComponent,
  ContentwrapperComponent,
  SidebarComponent,
  OnreturnDirective,
];
@NgModule({
  declarations: [...DECLARATIONS],
  imports: [CommonModule, CoreRoutingModule, MaterialLibModule],
  exports: [...DECLARATIONS],
})
export class CoreModule {}
