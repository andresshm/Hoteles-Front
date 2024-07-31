import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from "@angular/core";
import { ManagementService } from "app/services/management.service";
import { MatDialog } from "@angular/material/dialog";
import { Host } from "app/interfaces/host.interface";
import { Hotel } from "app/interfaces/hotel.interface";
import { Room } from "app/interfaces/room.interface";
import { Service } from "app/interfaces/service.interface";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "room-pop-up",
  templateUrl: "./pop-up.component.html",
  styleUrls: ["./pop-up.component.css"],
})
export class RoomPopUpComponent implements OnInit, OnChanges{
  
  @ViewChild('inputNumber') inputNumber : ElementRef;
  @ViewChild('inputType') inputType : ElementRef;
  @ViewChild('inputPrice') inputPrice : ElementRef;

  @Input()
  public roomAux: Room;

  @Input()
  public selectedIdHijo: number = 0;


  //habitacion
  public room: Room = {
    id: 0,
    idHotel: 0,
    numero: "",
    tipo: "",
    precioNoche: 0,
    huespedes: [],
    hotel: undefined,
  };



  constructor(
    private managementService: ManagementService
  ) 
  {}


  ngOnChanges(changes: SimpleChanges): void {
   
    if(changes && this.selectedIdHijo!==0 && this.roomAux){
      this.managementService.getRoomById(this.selectedIdHijo, 'habitacion').subscribe(room => this.roomAux = room);

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

  postNewHost(entity: string) {
    switch (entity) {
     
      case "ROO":
        this.managementService.postNewRoom(this.room).subscribe();
        break;
    
    }
  }

  onSubmitPut(entity: string) {
    switch (entity) {
      
      case "ROO":
        
        this.roomAux.numero=this.inputNumber.nativeElement.value;
        this.roomAux.tipo=this.inputType.nativeElement.value;
        this.roomAux.precioNoche=this.inputPrice.nativeElement.value;
        
        this.managementService
          .putRoom(this.selectedIdHijo, this.roomAux)
          .subscribe();
        break;
  
    }
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
