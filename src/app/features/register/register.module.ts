import { MaterialLibModule } from './../../core/material-lib/material-lib.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisteredListComponent } from './pages/registered-list/registered-list.component';
import { RegisterFormComponent } from './shared/register-form/register-form.component';
import { ReactiveFormsModule } from '@angular/forms';
// import { NgxMatFileInputModule } from '@angular-material-components/file-input';
// import { MatFileUploadModule } from 'angular-material-fileupload';
@NgModule({
  declarations: [RegisteredListComponent, RegisterFormComponent],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    MaterialLibModule,
    ReactiveFormsModule,
    // MatFileUploadModule,
    // NgxMatFileInputModule,
  ],
})
export class RegisterModule {}
