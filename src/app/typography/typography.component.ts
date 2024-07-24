import { Component, Host, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hotel } from 'app/interfaces/hotel.interface';
import { ManagementService } from 'app/services/management.service';


declare var $: any;
@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.css']
})
export class TypographyComponent implements OnInit {

  @Input()
  nombre = '';
  
  @Input()
  direccion='';

  @Input()
  telefono='';

  @Input()
  email='';

  @Input()
  sitioWeb= '';

  @Input()
  selectedId: number = 0;

  public showButton = false;
  public hotels: Hotel[]= [];

  data : Hotel = {
    id: 0,
    nombre: '',
    direccion: '',
    telefono: '',
    email: '',
    sitioWeb: '',
    services: [],
    servicios: [],
    habitaciones: []
  }
  
  constructor(private managementService : ManagementService,
    private router : Router
  ) { }

  get ruta():string{
    return this.router.url;
  }

  setIndex(id:number){
    this.selectedId=id;
    console.log(this.selectedId);
  }

  onSubmit(){
 
    this.data.nombre=this.nombre;
    this.data.direccion=this.direccion;
    this.data.telefono=this.telefono;
    this.data.email=this.email;
    this.data.sitioWeb=this.sitioWeb;

    console.log(this.data);


    this.managementService.postNewHotel(this.data)
    .subscribe();

  }

  
  onSubmitPUT(){
    this.data.nombre=this.nombre;
    this.data.direccion=this.direccion;
    this.data.telefono=this.telefono;
    this.data.email=this.email;
    this.data.sitioWeb=this.sitioWeb;




    this.managementService.putHotel(this.selectedId, this.data)
    .subscribe();

  }

  onSubmitDEL(id:number){
    console.log('llega')
    this.managementService.deleteHotel(id)
    .subscribe();
  }

  getHoteles() {
   
    this.managementService.getHotelsRequest('hotel')
      .subscribe(hotels => {
        this.hotels = hotels.sort((a, b)=>a.id-b.id);
        //pongo el sort xq al hacer un put del primer id por ej. este se va a la ultima pos en el get
      });
  }


  ngOnInit() {
    console.log(this.router.url);
    // Esta parte gestiona las notificaciones despues de 
    // borrar un huesped. Se añade una señal por asi decirlo
    // en el localStorage y si la encontramos al recargar
    // mostramos la noti y limpiamos el historial para que no
    // salga la noti cada vez que recargamos
    const mensaje = localStorage.getItem('notificacion');

    // mensaje es DEL/POST/PUT
    //se podria dejar el remove para el final y no repetirlo
    
    if(mensaje)
    switch(mensaje){
      case 'DEL':
        this.showNotification('top', 'right', 'DEL');
        localStorage.removeItem('notificacion');
        break;
      case 'POST':
        this.showNotification('top', 'right', 'POST');
        localStorage.removeItem('notificacion');
        break;
      case 'PUT':
        this.showNotification('top', 'right', 'PUT');
        localStorage.removeItem('notificacion');
        break;
    }




    this.router.events.subscribe(() => {
      this.checkRoute();
    });
    this.checkRoute();




    this.getHoteles();
  }


  checkRoute() {
    const currentRoute = this.router.url;
    this.showButton = currentRoute === '/typography';
  }

  showNotification(from :string, align:string, tipo:string){
    // const type = ['','info','success','warning','danger'];

    // const color = Math.floor((Math.random() * 4) + 1);
    let mensaje = '';

    switch(tipo){
      case 'DEL': mensaje = "Hotel eliminado correctamente";break;
      case 'POST': mensaje = "Hotel creado correctamente";break;
      case 'PUT': mensaje = "Hotel actualizado correctamente";break;

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
