import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
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
  
 
  selectedHotelId: number;
  selectedServiceIds: number[] = [];

  constructor(
    private managementService : ManagementService,
    private translateService : TranslateService,

    // private router : Router
  ) { }



  ngOnInit(): void {
    this.loadHotels();
    this.loadServices();
  }

  loadHotels() {
    // Replace this with actual data fetching
    this.managementService.getAllRequest('hotel').subscribe(hoteles => {
      this.hotels = hoteles.sort((a, b)=>a.id-b.id);
      // this.hotel = this.hotels[0];
    })
  }

  loadServices() {
    // Replace this with actual data fetching
    this.managementService.getAllRequest('servicio').subscribe(servicios => this.services = servicios)

  }

  onHotelChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedHotelId = parseInt(selectElement.value, 10);
    if(this.selectedHotelId)
      this.managementService.getById(this.selectedHotelId, 'hotel').subscribe(hotelAux => this.hotel = hotelAux)

  }


  toggleService(serviceId: number) {


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
    this.managementService.getById(this.selectedHotelId, 'hotel').subscribe(hotelAux => {
      hotel = hotelAux;
      hotel.services=this.selectedServiceIds;
      this.managementService.put(this.selectedHotelId, hotel, 'hotel').subscribe();
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
      case 'DEL':  mensaje = "Servicio eliminado correctamente";    mensaje=this.translateService.instant("servicios_eliminado");     break;
      case 'POST': mensaje = "Servicio creado correctamente";       mensaje=this.translateService.instant("servicios_creado");        break;
      case 'PUT':  mensaje = "Servicio actualizado correctamente";  mensaje=this.translateService.instant("servicios_actualizado");   break;  
      case 'STH':  mensaje = "Servicios añadidos correctamente";    mensaje=this.translateService.instant("servicios_anadidos");      break;

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
