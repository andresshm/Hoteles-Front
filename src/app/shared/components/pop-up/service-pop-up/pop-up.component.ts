import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { ManagementService } from "app/services/management.service";
import { MatDialog } from "@angular/material/dialog";
import { Host } from "app/interfaces/host.interface";
import { Hotel } from "app/interfaces/hotel.interface";
import { Room } from "app/interfaces/room.interface";
import { Service } from "app/interfaces/service.interface";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "service-pop-up",
  templateUrl: "./pop-up.component.html",
  styleUrls: ["./pop-up.component.css"],
})
export class ServicePopUpComponent implements OnInit, OnChanges{
  // Lo suyo seria emitir un evento para que lo elimine table list, pero no funciona
  @Output()
  public onDeleteId: EventEmitter<number> = new EventEmitter();

  @Input()
  public hostAux: Host;

  @Input()
  public hotelAux: Hotel;

  @Input()
  public roomAux: Room;

  @Input()
  public serviceAux: Service;


  @Input()
  public selectedIdHijo: number = 0;


  //host
  public host: Host = {
    id: 0,
    idHabitacion: 0,
    nombre: "",
    apellido: "",
    dniPasaporte: "",
    procedencia: "",
    fechaCheckin: undefined,
    fechaCheckout: undefined,
  };

  
  // public hostAux: Host= {
  //   id: 0,
  //   idHabitacion: 0,
  //   nombre: "",
  //   apellido: "",
  //   dniPasaporte: "",
  //   fechaCheckin: undefined,
  //   fechaCheckout: undefined,
  //   procedencia: ""
  // };

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

  //servicio
  public service: Service = {
    id: 0,
    nombre: "",
    descripcion: "",
    hoteles: [],
  };

  public huespedForm: FormGroup = this.fb.group({
    nombre: [''],
    apellido: [''],
    dniPasaporte: [''],
    procedencia: [''],
    fechaCheckin: [''],
    fechaCheckout: ['']
  });




  public dateIn : string;
  public dateOut : string;


  public timeIn : string;
  public timeOut : string;

  constructor(
    private managementService: ManagementService,
    private fb: FormBuilder
  ) // public dialog: MatDialog
  {}


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
      case "HOT":
        this.managementService.postNewHotel(this.hotel).subscribe();
        break;
      case "HOS":
 
      
        this.dateOut = this.dateOut.replace(/-/g,'/');
        let [year, month, day] = this.dateOut.split('/');
        let formattedDateOut = `${day}/${month}/${year}`;
        const s = `${formattedDateOut} ${this.timeOut}`
        
        
        this.dateIn = this.dateIn.replace(/-/g,'/');
        let [yearIn, monthIn, dayIn] = this.dateIn.split('/');
        let formattedDateIn = `${dayIn}/${monthIn}/${yearIn}`;
        const sIn = `${formattedDateIn} ${this.timeIn}`
        
        this.host.fechaCheckout =  (s);
        this.host.fechaCheckin =  (sIn);


        this.managementService.postNewHost(this.host).subscribe();
        break;
      case "ROO":
        this.managementService.postNewRoom(this.room).subscribe();
        break;
      case "SER":
        this.managementService.postNewService(this.service).subscribe();
        break;
    }
  }

  onSubmitPut(entity: string) {
    switch (entity) {
      case "HOT":
        this.managementService
          .putHotel(this.selectedIdHijo, this.hotel)
          .subscribe();
        break;
      case "HOS":
        this.dateOut = this.dateOut.replace(/-/g,'/');
        let [year, month, day] = this.dateOut.split('/');
        let formattedDateOut = `${day}/${month}/${year}`;
        const s = `${formattedDateOut} ${this.timeOut}`
        
        
        this.dateIn = this.dateIn.replace(/-/g,'/');
        let [yearIn, monthIn, dayIn] = this.dateIn.split('/');
        let formattedDateIn = `${dayIn}/${monthIn}/${yearIn}`;
        const sIn = `${formattedDateIn} ${this.timeIn}`
        
        this.hostAux.fechaCheckout =  (s);
        this.hostAux.fechaCheckin =  (sIn);

        this.managementService
          .putHost(this.selectedIdHijo, this.hostAux)
          .subscribe();
        break;
      case "ROO":
        this.managementService
          .putRoom(this.selectedIdHijo, this.room)
          .subscribe();
        break;
      case "SER":
        this.managementService
          .putService(this.selectedIdHijo, this.serviceAux)
          .subscribe();
        break;
    }
  }

  //no se usa. se pueden hacer cosas con formularios reactivos si da tiempo
  onSubmitPatch(id: number) {
    // this.managementService.patchHost(id, this.host).subscribe();

    // this.managementService.getHostById(this.selectedIdHijo, 'huesped').subscribe(host => this.hostAux = host);
    console.log(this.hostAux.nombre);
    console.log(this.selectedIdHijo);

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
