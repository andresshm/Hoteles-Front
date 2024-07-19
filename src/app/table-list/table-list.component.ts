import { Component, OnInit } from '@angular/core';
import { Host } from 'app/interfaces/host.interface';
import { Hotel } from 'app/interfaces/hotel.interface';
import { Room } from 'app/interfaces/room.interface';
import { Service } from 'app/interfaces/service.interface';
import { ManagementService } from 'app/services/management.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css'],

})
export class TableListComponent implements OnInit {

  public hosts: Host[]= [];
  public rooms: Room[]= [];
  public hotels: Hotel[]= [];
  public services: Service[]= [];


  public showHostTable = false;
  public showRoomTable = false;
  public showHotelTable = false;
  public showServiceTable = false;

  constructor(private managementService : ManagementService) { }

   ngOnInit() {
   this.getHuespedes();
  }


  getHuespedes() {
   
    this.managementService.getHostsRequest('huesped')
      .subscribe(hosts => {
        this.hosts = hosts.sort((a, b)=>a.id-b.id);
        //pongo el sort xq al hacer un put del primer id por ej. este se va a la ultima pos en el get
      });
  }

  getHabitaciones(){
    this.managementService.getRoomsRequest('habitacion')
      .subscribe(rooms => {
        this.rooms=rooms.sort((a, b)=>a.id-b.id);
      });
  }

  getHoteles(){
    this.managementService.getHotelsRequest('hotel')
      .subscribe(hotels => {
        this.hotels=hotels.sort((a, b)=>a.id-b.id);
      });
  }

  getServicios(){
    this.managementService.getServicesRequest('servicio')
      .subscribe(services => {
        this.services=services.sort((a, b)=>a.id-b.id);
      });
  }

  toggleHostTable() {
    if(!this.showHostTable) this.getHuespedes();
    this.showHostTable = !this.showHostTable;
  }
  toggleRoomTable() {
    if(!this.showRoomTable) this.getHabitaciones();
    this.showRoomTable = !this.showRoomTable;
  }
  toggleHotelTable() {
    if(!this.showHotelTable) this.getHoteles();
    this.showHotelTable = !this.showHotelTable;
  }
  toggleServiceTable() {
    if(!this.showServiceTable) this.getServicios();
    this.showServiceTable = !this.showServiceTable;
  }

}
