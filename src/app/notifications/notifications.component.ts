import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Host } from 'app/interfaces/host.interface';
import { Hotel } from 'app/interfaces/hotel.interface';
import { Room } from 'app/interfaces/room.interface';
import { Service } from 'app/interfaces/service.interface';
import { ManagementService } from 'app/services/management.service';
declare var $: any;

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  

  public hosts: Host[]= [];
  public rooms: Room[]= [];
  public room: Room;
  

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
  selectedHostIds: number[]=[];

  constructor(
    private managementService : ManagementService,
    private translateService  : TranslateService,
  ) { }



  ngOnInit(): void {
    this.loadRooms();
    this.loadHosts();
  }

  loadRooms() {
    // Replace this with actual data fetching
    this.managementService.getAllRequest('habitacion').subscribe(hoteles => {
      this.rooms = hoteles.sort((a, b)=>a.id-b.id);
      // this.hotel = this.Rooms[0];
    })
  }

  loadHosts() {
    // Replace this with actual data fetching
    this.managementService.getAllRequest('huesped').subscribe(servicios => this.hosts = servicios)

  }

  onHotelChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedHotelId = parseInt(selectElement.value, 10);
    console.log('Selected hotel ID:', this.selectedHotelId);
    if(this.selectedHotelId)
      this.managementService.getById(this.selectedHotelId, 'habitacion').subscribe(hotelAux => this.room = hotelAux)

  }


  toggleService(hostId: number) {
    console.log('Selected host ID:', hostId);
    // console.log('Selected hotel ID:', this.selectedHotelId);

    const index = this.selectedHostIds.indexOf(hostId);
    if (index === -1) {
      this.selectedHostIds.push(hostId);
    } else {
      this.selectedHostIds.splice(index, 1);
    }
  }

  linkHosts() {
    console.log('lista de ids', this.selectedHostIds)
    let hotel : Hotel;
    this.managementService.getById(this.selectedHotelId, 'habitacion').subscribe(roomAux => {
      this.room = roomAux;
    });

    for(let i of this.selectedHostIds){
      let host : Host;
      this.managementService.getById(i, 'huesped').subscribe(hostAux => {
        host=hostAux;
        host.idHabitacion=this.selectedHotelId;
        this.managementService.putHost(i, host).subscribe();
      });
      
    }

    
  }


  includedServices(host:Host) : boolean{
    if(host && this.room)
      return this.room.huespedes.includes(host);
  }



  showNotification(from :string, align:string, tipo:string){

    let mensaje = '';

    switch(tipo){
      case 'DEL':  mensaje = "Huésped eliminado correctamente";    mensaje=this.translateService.instant("huesped_eliminado");     break;
      case 'POST': mensaje = "Huésped creado correctamente";       mensaje=this.translateService.instant("huesped_creado");        break;
      case 'PUT':  mensaje = "Huésped actualizado correctamente";  mensaje=this.translateService.instant("huesped_actualizado");   break;
      case 'STH':  mensaje = "Huespedes añadidos correctamente";   mensaje=this.translateService.instant("huespedes_anadidos");    break;

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
