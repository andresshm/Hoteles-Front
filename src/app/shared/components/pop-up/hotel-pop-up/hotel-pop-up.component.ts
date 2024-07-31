import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from "@angular/core";
import { ManagementService } from "app/services/management.service";
import { MatDialog } from "@angular/material/dialog";
import { Host } from "app/interfaces/host.interface";
import { Hotel } from "app/interfaces/hotel.interface";
import { Room } from "app/interfaces/room.interface";
import { Service } from "app/interfaces/service.interface";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "hotel-pop-up",
  templateUrl: "./hotel-pop-up.component.html",
  styleUrls: ["./hotel-pop-up.component.css"],
})
export class HotelPopUpComponent implements OnInit, OnChanges{
  
  @ViewChild('inputName') inputName!: ElementRef;
  @ViewChild('inputAddress') inputAddress!: ElementRef;
  @ViewChild('inputPhone') inputPhone!: ElementRef;
  @ViewChild('inputEmail') inputEmail!: ElementRef;

 

  @Input()
  public hotelAux: Hotel;



  @Input()
  public selectedIdHijo: number = 0;

  //hotel
  public hotel: Hotel = {
    id: 0,
    nombre: "",
    direccion: "",
    telefono: "",
    email: "",
    sitioWeb: "",
    services: [],
    servicios: [],
    habitaciones: [],
  };


  constructor(
    private managementService: ManagementService
  )
  {}


  ngOnChanges(changes: SimpleChanges): void {
    if(changes && this.selectedIdHijo!==0 && this.hotelAux){

      console.log(this.selectedIdHijo, ' onchanges');
      this.managementService.getHotelById(this.selectedIdHijo, 'hotel').subscribe(hotel => this.hotelAux = hotel);
    }

  }

  ngOnInit(): void {

  }

  onSubmitDEL(entity: string) {
    console.log(this.selectedIdHijo);
    switch (entity) {
      case "HOT":
        this.managementService.deleteHotel(this.selectedIdHijo).subscribe();
        break;
      case "HOS":
        this.managementService.deleteHost(this.selectedIdHijo).subscribe();
        break;
      case "ROO":
        this.managementService.deleteRoom(this.selectedIdHijo).subscribe();
        break;
      case "SER":
        this.managementService.deleteService(this.selectedIdHijo).subscribe();
        break;
    }
  }

  postNewHotel(entity: string) {
    switch (entity) {
      case "HOT":
        this.managementService.postNewHotel(this.hotel).subscribe();
        break;
      
    }
  }

  onSubmitPut(entity: string) {
    switch (entity) {
      case "HOT":
        
        this.hotelAux.nombre=this.inputName.nativeElement.value;
        this.hotelAux.direccion=this.inputAddress.nativeElement.value;
        this.hotelAux.telefono=this.inputPhone.nativeElement.value;
        this.hotelAux.email=this.inputEmail.nativeElement.value;



        this.managementService
          .putHotel(this.selectedIdHijo, this.hotelAux)
          .subscribe();
        break;
      
    }
  }

  //no se usa. se pueden hacer cosas con formularios reactivos si da tiempo
  onSubmitPatch(id: number) {


  }

  recharge(op: string) {
    switch (op) {
      case "DEL":
        localStorage.setItem("notificacion", "DEL");
        break;
      case "POST":
        localStorage.setItem("notificacion", "POST");
        break;
      case "PUT":
        localStorage.setItem("notificacion", "PUT");
        break;
    }
    window.location.reload();
  }
}
