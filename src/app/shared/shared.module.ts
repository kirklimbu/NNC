import { MaterialLibModule } from './../core/material-lib/material-lib.module';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { TableActionButtonsComponent } from './components/table-action-buttons/table-action-buttons.component';
import { DeletePopupComponent } from './components/delete-popup/delete-popup.component';

const DECLARATIONS: any[] = [TableActionButtonsComponent, DeletePopupComponent];

@NgModule({
  declarations: [...DECLARATIONS],
  imports: [CommonModule, SharedRoutingModule, MaterialLibModule],

  exports: [MaterialLibModule, ...DECLARATIONS],
})
export class SharedModule {}
