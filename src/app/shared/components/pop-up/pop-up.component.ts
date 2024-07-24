import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ManagementService } from 'app/services/management.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Host } from 'app/interfaces/host.interface';
import { Hotel } from 'app/interfaces/hotel.interface';
import { Room } from 'app/interfaces/room.interface';
import { Service } from 'app/interfaces/service.interface';




@Component({
    selector: 'shared-pop-up',
    templateUrl: './pop-up.component.html',
    styleUrls: ['./pop-up.component.css']
})

export class PopUpComponent implements OnInit{
    // Lo suyo seria emitir un evento para que lo elimine table list, pero no funciona
    @Output()
    public onDeleteId: EventEmitter<number> = new EventEmitter();

    @Input()
    public onDelete: number = 0;

    @Input()
    public selectedIdHijo : number=0;

  //host
    public host : Host={
      id: 0,
      idHabitacion: 0,
      nombre: '',
      apellido: '',
      dniPasaporte: '',
      fechaCheckin: undefined,
      fechaCheckout: undefined
    }



    //hotel
public hotel : Hotel={
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




    //habitacion
public room : Room = {
  id: 0,
  idHotel: 0,
  numero: '',
  tipo: '',
  precioNoche: 0,
  huespedes: [],
  hotel: undefined
}





    //servicio
public service : Service = {
  id: 0,
  nombre: '',
  descripcion: '',
  hoteles: []
}




    constructor(private managementService : ManagementService,
      // public dialog: MatDialog
    ) { }


  ngOnInit(): void {

  }


    onSubmitDEL(entity:string){
        console.log(this.selectedIdHijo);
        switch(entity){
          case 'HOT': 
            this.managementService.deleteHotel(this.selectedIdHijo).subscribe();
            break;
          case 'HOS':
            this.managementService.deleteHost(this.selectedIdHijo).subscribe();
            break;
          case 'ROO': 
            this.managementService.deleteRoom(this.selectedIdHijo).subscribe();
            break;
          case 'SER': 
            this.managementService.deleteService(this.selectedIdHijo).subscribe();
            break;
          }

     
      }


      postNewHost(entity : string){


        switch(entity){
          case 'HOT': 
            this.managementService.postNewHotel(this.hotel).subscribe();          
            break;
          case 'HOS':
            this.managementService.postNewHost(this.host).subscribe();            
            break;
          case 'ROO': 
            this.managementService.postNewRoom(this.room).subscribe();          
            break;
          case 'SER': 
            this.managementService.postNewService(this.service).subscribe();
            break;
          }

      }


      onSubmitPut(entity:string){

        switch(entity){
          case 'HOT': 
            this.managementService.putHotel(this.selectedIdHijo, this.hotel).subscribe();
            break;
          case 'HOS':
            this.managementService.putHost(this.selectedIdHijo, this.host).subscribe();
            break;
          case 'ROO': 
            this.managementService.putRoom(this.selectedIdHijo, this.room).subscribe();
            break;
          case 'SER': 
            this.managementService.putService(this.selectedIdHijo, this.service).subscribe();
            break;
          }
      }

//no se usa. se pueden hacer cosas con formularios reactivos si da tiempo
      onSubmitPatch(id:number){
      
        
        this.managementService.patchHost(id, this.host)
        .subscribe();
    }

      recharge(op:string){
        switch(op){
          case 'DEL':
            localStorage.setItem('notificacion', 'DEL');
            break;
          case 'POST':
            localStorage.setItem('notificacion', 'POST');
            break;
          case 'PUT':
            localStorage.setItem('notificacion', 'PUT');
            break;
        }
        window.location.reload();
      }




  
}