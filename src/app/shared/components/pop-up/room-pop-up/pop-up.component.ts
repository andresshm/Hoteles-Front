import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from "@angular/core";
import { ManagementService } from "app/services/management.service";
import { Room } from "app/interfaces/room.interface";

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
      this.managementService.getById(this.selectedIdHijo, 'habitacion').subscribe(room => this.roomAux = room);

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

  postNewHost(entity: string) {
    switch (entity) {
     
      case "ROO":
        this.managementService.post(this.room, 'habitacion').subscribe();
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
          .put(this.selectedIdHijo, this.roomAux, 'habitacion').subscribe();
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
