import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { FloatingButtonComponent } from './components/floating-button/floating-button.component';
import { PopUpComponent } from './components/pop-up/pop-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { CommonModule } from '@angular/common';
import { AdminLayoutModule } from 'app/layouts/admin-layout/admin-layout.module';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import {MatDatepicker, MatDatepickerToggle} from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core';
import { ControllerComponent } from './controller/controller.component';
import { AdminLayoutComponent } from 'app/layouts/admin-layout/admin-layout.component';


@NgModule({
    imports: [MatIconModule, FormsModule, CommonModule, ReactiveFormsModule, /*MatFormField, /*MatLabel, MatDatepicker, MatDatepickerToggle, MatNativeDateModule*/],
    exports: [FloatingButtonComponent, PopUpComponent, ControllerComponent],
    declarations: [FloatingButtonComponent, PopUpComponent, ControllerComponent],
    providers: [],
})
export class SharedModule { }
