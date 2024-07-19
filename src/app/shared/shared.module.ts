import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { FloatingButtonComponent } from './components/floating-button/floating-button.component';

@NgModule({
    imports: [MatIconModule],
    exports: [FloatingButtonComponent],
    declarations: [FloatingButtonComponent],
    providers: [],
})
export class SharedModule { }
