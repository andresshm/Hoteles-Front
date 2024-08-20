import { NgModule } from '@angular/core';
import { LanguageSelectorComponent } from './languaje-selector.component';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
    imports: [CommonModule, TranslateModule],
    exports: [LanguageSelectorComponent],
    declarations: [LanguageSelectorComponent],
    providers: [],
})
export class LanguajeModule { }
