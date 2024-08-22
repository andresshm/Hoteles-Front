import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from "@angular/core";
import { ManagementService } from "app/services/management.service";
import { Hotel } from "app/interfaces/hotel.interface";

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
      this.managementService.getById(this.selectedIdHijo, 'hotel').subscribe(hotel => this.hotelAux = hotel);
    }

  }

  ngOnInit(): void {

  }

  onSubmitDEL(entity: string) {
    console.log(this.selectedIdHijo);
    switch (entity) {
      case "HOT":
        this.managementService.delete(this.selectedIdHijo, 'hotel').subscribe();
        break;
      case "HOS":
        this.managementService.delete(this.selectedIdHijo, 'huesped').subscribe();
        break;
      case "ROO":
        this.managementService.delete(this.selectedIdHijo, 'habitacion').subscribe();
        break;
      case "SER":
        this.managementService.delete(this.selectedIdHijo, 'servicio').subscribe();
        break;
    }
  }

  postNewHotel(entity: string) {
    switch (entity) {
      case "HOT":
        this.managementService.post(this.hotel, 'hotel').subscribe();
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
          .put(this.selectedIdHijo, this.hotelAux, 'hotel').subscribe();
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
