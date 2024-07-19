import { Component, Input, OnInit } from '@angular/core';
import { Host } from 'app/interfaces/host.interface';
import { ManagementService } from 'app/services/management.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],

})
export class UserProfileComponent implements OnInit {

  @Input()
  nombre = '';
  
  @Input()
  apellido='';

  @Input()
  dniPasaporte='';

  @Input()
  fechaCheckin:Date;

  @Input()
  fechaCheckout:Date;

  @Input()
  selectedId : number = 0;


  data : Host = {
    id: 0,
    idHabitacion: 0,
    nombre: '',
    apellido: '',
    dniPasaporte: '',
    fechaCheckin: undefined,
    fechaCheckout: undefined
    
  }
  constructor(private managementService : ManagementService) { }

  ngOnInit() {
  }

  onSubmit(){
    console.log(this.nombre);
    console.log(this.apellido);
    console.log(this.dniPasaporte);
    console.log(this.fechaCheckin);
    console.log(this.fechaCheckout);

    this.data.nombre=this.nombre;
    this.data.apellido=this.apellido;
    this.data.dniPasaporte=this.dniPasaporte;
    this.data.fechaCheckin=this.fechaCheckin;
    this.data.fechaCheckout=this.fechaCheckout;


    this.managementService.postNewHost(this.data)
    .subscribe();

  }
  onSubmitPUT(){
    console.log(this.nombre);
    console.log(this.apellido);
    console.log(this.dniPasaporte);
    console.log(this.fechaCheckin);
    console.log(this.fechaCheckout);

    
    this.data.nombre=this.nombre;
    this.data.apellido=this.apellido;
    this.data.dniPasaporte=this.dniPasaporte;
    this.data.fechaCheckin=this.fechaCheckin;
    this.data.fechaCheckout=this.fechaCheckout;




    this.managementService.putHost(this.selectedId, this.data)
    .subscribe();

  }

  onSubmitDEL(){
    this.managementService.deleteHost(this.selectedId)
    .subscribe();
  }




}
