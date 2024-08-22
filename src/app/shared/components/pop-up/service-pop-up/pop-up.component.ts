import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from "@angular/core";

import { ManagementService } from "app/services/management.service";
import { Service } from "app/interfaces/service.interface";

@Component({
  selector: "service-pop-up",
  templateUrl: "./pop-up.component.html",
  styleUrls: ["./pop-up.component.css"],
})
export class ServicePopUpComponent implements OnInit, OnChanges{
  
  @ViewChild('myInput') myInput!: ElementRef;

  @Input()
  public serviceAux: Service;


  @Input()
  public selectedIdHijo: number = 0;



  //servicio
  public service: Service = {
    id: 0,
    nombre: "",
    descripcion: "",
    hoteles: [],
  };



  constructor( private managementService: ManagementService ) { }


  ngOnChanges(changes: SimpleChanges): void {

    // if(changes && this.selectedIdHijo!==0 && this.serviceAux){
    //   this.managementService.getServiceById(this.selectedIdHijo, 'servicio').subscribe(service => this.serviceAux = service);

    // }
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
     
      case "SER":
        this.managementService.post(this.service, 'servicio').subscribe();
        break;
    }
  }

  onSubmitPut(entity: string) {
    switch (entity) {
      
      case "SER":
      
        const inputValue = this.myInput.nativeElement.value;
        this.serviceAux.nombre=inputValue;
        this.managementService
          .put(this.selectedIdHijo, this.serviceAux, 'servicio').subscribe();
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
