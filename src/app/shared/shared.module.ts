import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { FloatingButtonComponent } from './components/floating-button/floating-button.component';
import { PopUpComponent } from './components/pop-up/pop-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [MatIconModule, FormsModule, CommonModule, ReactiveFormsModule],
    exports: [FloatingButtonComponent, PopUpComponent,  ],
    declarations: [FloatingButtonComponent, PopUpComponent, ],
    providers: [],
})
export class SharedModule { }
