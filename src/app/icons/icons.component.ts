import { Component, Host, Input, OnInit } from '@angular/core';
import { Room } from 'app/interfaces/room.interface';
import { ManagementService } from 'app/services/management.service';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.css']
})
export class IconsComponent implements OnInit {

  @Input()
  numero = '';
  
  @Input()
  tipo='';

  @Input()
  precioNoche=0;

  @Input()
  selectedId : number = 0;


  data : Room = {
    id: 0,
    idHotel: 0,
    numero: '',
    tipo: '',
    precioNoche: 0,
    huespedes: [],
    hotel: {
      id: 0,
      nombre: '',
      direccion: '',
      telefono: '',
      email: '',
      sitioWeb: '',
      services: [],
      servicios: [],
      habitaciones: []
    },
    
  }
  constructor(private managementService : ManagementService) { }

  ngOnInit() {
  }

  onSubmit(){


    this.data.numero=this.numero;
    this.data.tipo=this.tipo;
    this.data.precioNoche=this.precioNoche;
console.log(this.data);

    this.managementService.postNewRoom(this.data)
    .subscribe();

  }
  onSubmitPUT(){
    this.data.numero=this.numero;
    this.data.tipo=this.tipo;
    this.data.precioNoche=this.precioNoche;




    this.managementService.putRoom(this.selectedId, this.data)
    .subscribe();

  }

  onSubmitDEL(){
    this.managementService.deleteRoom(this.selectedId)
    .subscribe();
  }


}
