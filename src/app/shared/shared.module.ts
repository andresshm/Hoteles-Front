import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { FloatingButtonComponent } from './components/floating-button/floating-button.component';
import { PopUpComponent } from './components/pop-up/pop-up.component';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

@NgModule({
    imports: [MatIconModule, FormsModule],
    exports: [FloatingButtonComponent, PopUpComponent,  ],
    declarations: [FloatingButtonComponent, PopUpComponent, ],
    providers: [],
})
export class SharedModule { }
