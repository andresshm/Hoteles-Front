import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from "@angular/core";
import { ManagementService } from "app/services/management.service";
import { Host } from "app/interfaces/host.interface";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "host-pop-up",
  templateUrl: "./pop-up.component.html",
  styleUrls: ["./pop-up.component.css"],
})
export class HostPopUpComponent implements OnInit, OnChanges{
  

  @ViewChild('inputName') inputName!: ElementRef;
  @ViewChild('inputSurname') inputSurname!: ElementRef;
  @ViewChild('inputDni') inputDni!: ElementRef;
  @ViewChild('inputOrigin') inputOrigin!: ElementRef;
  @ViewChild('inputDateIn') inputDateIn!: ElementRef;
  @ViewChild('inputTimeIn') inputTimeIn!: ElementRef;
  @ViewChild('inputDateOut') inputDateOut!: ElementRef;
  @ViewChild('inputTimeOut') inputTimeOut!: ElementRef;



  @Input()
  public hostAux: Host;


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
  )
  {}


  ngOnChanges(changes: SimpleChanges): void {
    if(changes && this.selectedIdHijo!==0 && this.hostAux){

      console.log(this.selectedIdHijo);
      this.managementService.getById(this.selectedIdHijo, 'huesped').subscribe(host => this.hostAux = host);
      
      let originalDate = this.hostAux.fechaCheckin;
      let parts = originalDate.split(" ")[0].split("/"); // Split the date and then the parts
      let formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
      this.dateIn = formattedDate;
      console.log(this.dateIn);
      this.timeIn = originalDate.split(" ")[1];


      originalDate = this.hostAux.fechaCheckout;
      parts = originalDate.split(" ")[0].split("/"); // Split the date and then the parts
      formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
      this.dateOut = formattedDate;
      this.timeOut = originalDate.split(" ")[1];
    }
    /*if(changes && this.selectedIdHijo!==0 && this.hotelAux){
      this.managementService.getHotelById(this.selectedIdHijo, 'hotel').subscribe(hotel => this.hotelAux = hotel);

    }*/
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


        this.managementService.post(this.host, 'huesped').subscribe();
        break;
     
    }
  }

  onSubmitPut(entity: string) {
    switch (entity) {
      
      case 'HOS':
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

        
        this.hostAux.nombre=this.inputName.nativeElement.value;
        this.hostAux.apellido=this.inputSurname.nativeElement.value;
        this.hostAux.dniPasaporte=this.inputDni.nativeElement.value;
        this.hostAux.procedencia=this.inputOrigin.nativeElement.value;

        this.managementService
          .put(this.selectedIdHijo, this.hostAux, 'huesped').subscribe();
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
