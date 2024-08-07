import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FloatingButtonComponent } from './components/floating-button/floating-button.component';
import { HotelPopUpComponent } from './components/pop-up/hotel-pop-up/hotel-pop-up.component';
import { RoomPopUpComponent } from './components/pop-up/room-pop-up/pop-up.component';
import { ServicePopUpComponent } from './components/pop-up/service-pop-up/pop-up.component';
import { HostPopUpComponent } from './components/pop-up/host-pop-up/pop-up.component';
import { LoginComponent } from './components/login/login.component';


@NgModule({
    imports: [MatIconModule, FormsModule, CommonModule, ReactiveFormsModule,],
    exports: [FloatingButtonComponent, HotelPopUpComponent, RoomPopUpComponent, ServicePopUpComponent, HostPopUpComponent, LoginComponent],
    declarations: [FloatingButtonComponent, HotelPopUpComponent, RoomPopUpComponent, ServicePopUpComponent, HostPopUpComponent, LoginComponent],
    providers: [],
})
export class SharedModule { }
