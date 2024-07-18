import { Component, Host, Input, OnInit } from '@angular/core';
import { Hotel } from 'app/interfaces/hotel.interface';
import { ManagementService } from 'app/services/management.service';

@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.css']
})
export class TypographyComponent implements OnInit {

  @Input()
  nombre = '';
  
  @Input()
  direccion='';

  @Input()
  telefono='';

  @Input()
  email='';

  @Input()
  sitioWeb= '';

  @Input()
  selectedId: number = 0;

  data : Hotel = {
    id: 0,
    nombre: '',
    direccion: '',
    telefono: '',
    email: '',
    sitioWeb: '',
    services: [],
    servicios: [],
    habitaciones: []
  }
  
  constructor(private managementService : ManagementService) { }

 

  onSubmit(){
 
    this.data.nombre=this.nombre;
    this.data.direccion=this.direccion;
    this.data.telefono=this.telefono;
    this.data.email=this.email;
    this.data.sitioWeb=this.sitioWeb;

    console.log(this.data);


    this.managementService.postNewHotel(this.data)
    .subscribe();

  }

  
  onSubmitPUT(){
    this.data.nombre=this.nombre;
    this.data.direccion=this.direccion;
    this.data.telefono=this.telefono;
    this.data.email=this.email;
    this.data.sitioWeb=this.sitioWeb;




    this.managementService.putHotel(this.selectedId, this.data)
    .subscribe();

  }

  onSubmitDEL(){
    this.managementService.deleteHotel(this.selectedId)
    .subscribe();
  }


  ngOnInit() {
  }
}
