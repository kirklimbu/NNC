import { MaterialLibModule } from './../core/material-lib/material-lib.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { TableActionButtonsComponent } from './components/table-action-buttons/table-action-buttons.component';
const DECLARATIONS: any[] = [TableActionButtonsComponent];

@NgModule({
  declarations: [...DECLARATIONS],
  imports: [CommonModule, SharedRoutingModule, MaterialLibModule],
  exports: [...DECLARATIONS],
})
export class SharedModule {}
