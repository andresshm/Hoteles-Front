import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Host } from 'app/interfaces/host.interface';
import { Hotel } from 'app/interfaces/hotel.interface';
import { Room } from 'app/interfaces/room.interface';
import { Service } from 'app/interfaces/service.interface';
import { ManagementService } from 'app/services/management.service';

declare var $: any;

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css'],

})
export class TableListComponent implements OnInit {
 


  public hosts: Host[]= [];
  public rooms: Room[]= [];
  public hotels: Hotel[]= [];
  public hotel: Hotel = {
    id: 0,
    nombre: '',
    direccion: '',
    telefono: '',
    email: '',
    sitioWeb: '',
    services: [],
    servicios: [],
    habitaciones: []
  };
  public services: Service[]= [];

  public name:string=''
  public surname:string=''
  public dni:string=''
  public checkin:string=''
  public checkout:string=''
  


  // public showHostTable = false;
  // public showRoomTable = false;
  // public showHotelTable = false;
  // public showServiceTable = false;

//   public selectedId: number=0;
//   public showButton: boolean = false;
//   public showFilters: boolean = false;
//   public showSorters: boolean = false;
//   public invertirSeleccion: boolean = false;
//  public selectedOption:string='';


 
selectedHotelId: number;
selectedServiceIds: number[] = [];

  constructor(private managementService : ManagementService,
    // private router : Router
  ) { }



  ngOnInit(): void {
    this.loadHotels();
    this.loadServices();
  }

  loadHotels() {
    // Replace this with actual data fetching
    this.managementService.getHotelsRequest('hotel').subscribe(hoteles => {
      this.hotels = hoteles.sort((a, b)=>a.id-b.id);
      // this.hotel = this.hotels[0];
    })
  }

  loadServices() {
    // Replace this with actual data fetching
    this.managementService.getServicesRequest('servicio').subscribe(servicios => this.services = servicios)

  }

  onHotelChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedHotelId = parseInt(selectElement.value, 10);
    console.log('Selected hotel ID:', this.selectedHotelId);
    if(this.selectedHotelId)
      this.managementService.getHotelById(this.selectedHotelId, 'hotel').subscribe(hotelAux => this.hotel = hotelAux)

  }
  // onRoomChange(event: Event) {
  //   const selectElement = event.target as HTMLSelectElement;
  //   this.selectedHotelId = parseInt(selectElement.value, 10);
  //   console.log('Selected hotel ID:', this.selectedHotelId);
  //   if(this.selectedHotelId)
  //     this.managementService.getHotelById(this.selectedHotelId, 'hotel').subscribe(hotelAux => this.hotel = hotelAux)

  // }

  toggleService(serviceId: number) {
    console.log('Selected service ID:', serviceId);
    // console.log('Selected hotel ID:', this.selectedHotelId);

    const index = this.selectedServiceIds.indexOf(serviceId);
    if (index === -1) {
      this.selectedServiceIds.push(serviceId);
    } else {
      this.selectedServiceIds.splice(index, 1);
    }
  }

  linkServices() {
    console.log('lista de ids', this.selectedServiceIds)
    let hotel : Hotel;
    this.managementService.getHotelById(this.selectedHotelId, 'hotel').subscribe(hotelAux => {
      hotel = hotelAux;
      hotel.services=this.selectedServiceIds;
      this.managementService.putHotel(this.selectedHotelId, hotel).subscribe();
    });

    
  }


  includedServices(serviceId:number) : boolean{
    if(serviceId)
      if(this.hotel.services.includes(serviceId))
        return true;
      else
        return false;
    return;
  }



  showNotification(from :string, align:string, tipo:string){

    let mensaje = '';

    switch(tipo){
      case 'DEL': mensaje = "Huésped eliminado correctamente";break;
      case 'POST': mensaje = "Huésped creado correctamente";break;
      case 'PUT': mensaje = "Huésped actualizado correctamente";break;
      case 'STH': mensaje = "Servicios añadidos correctamente";break;

    }
    
    $.notify({
        icon: "notifications",
        message: mensaje

    },{
        type: ('success'),
        timer: 4000,
        placement: {
            from: from,
            align: align
        },
        template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
          '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
          '<i class="material-icons" data-notify="icon">notifications</i> ' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          '</div>' +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    });
}

}
