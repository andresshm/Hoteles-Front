import { NgModule } from '@angular/core';

import { LoginComponent } from './pages/login/login.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './pages/register/register.component';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    exports: [],
    declarations: [LoginComponent, RegisterComponent],
    providers: [],
})
export class AuthModule { }
