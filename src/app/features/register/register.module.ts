import { LoginModule } from './../login/login.module';
import { SharedModule } from './../../shared/shared.module';
import { MaterialLibModule } from '../../core/material-lib/material-lib.module';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisteredListComponent } from './pages/registered-list/registered-list.component';
import { RegisterFormComponent } from './shared/register-form/register-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { NgxMatFileInputModule } from '@angular-material-components/file-input';
// import { MatFileUploadModule } from 'angular-material-fileupload';
import { NgxPrintModule } from 'ngx-print';
import { VerifyLetterComponent } from './pages/verify-letter/verify-letter.component';
import { PrintLetterComponent } from './pages/print-letter/print-letter.component';

@NgModule({
  declarations: [
    RegisteredListComponent,
    RegisterFormComponent,
    VerifyLetterComponent,
    PrintLetterComponent,
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    MaterialLibModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    LoginModule,
    NgxPrintModule,
    // MatFileUploadModule,
    // NgxMatFileInputModule,
  ],
  providers: [DatePipe],
})
export class RegisterModule {}
