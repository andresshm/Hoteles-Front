import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Criterio } from 'app/interfaces/criterio.interface';
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
  selectedId: number = 0;


  
  public nombre: string = '';  
  public direccion: string='';  
  public telefono: string='';  
  public email: string='';  
  public sitioWeb: string= '';



  public showFilters: boolean = false;
  public showSorters: boolean = false;
  public invertirSeleccion: boolean = false;
 public selectedOption:string='';

  public showButton = false;
  public hotels: Hotel[]= [];
  public hotel: Hotel;



  displayedHotels: Hotel[] = [];
  pageSize: number = 10;
  currentPage: number = 0;

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
  
  constructor(
    private managementService : ManagementService,
    private router            : Router,
    private translateService  : TranslateService
  ) { }


  get ruta():string{
    return this.router.url;
  }

  setIndex(id:number){
    this.selectedId=id;
    console.log(this.selectedId);
    this.managementService.getById(id, 'hotel').subscribe(hotel => this.hotel = hotel);

  }

  onSubmit(){
 
    this.data.nombre=this.nombre;
    this.data.direccion=this.direccion;
    this.data.telefono=this.telefono;
    this.data.email=this.email;
    this.data.sitioWeb=this.sitioWeb;

    this.managementService.post(this.data, 'hotel').subscribe();

  }

  
  onSubmitPUT(){
    this.data.nombre=this.nombre;
    this.data.direccion=this.direccion;
    this.data.telefono=this.telefono;
    this.data.email=this.email;
    this.data.sitioWeb=this.sitioWeb;




    this.managementService.put(this.selectedId, this.data, 'hotel').subscribe();

  }

  onSubmitDEL(id:number){
    this.managementService.delete(id, 'hotel').subscribe();
  }

  getHoteles() {
   
    this.managementService.getAllRequest('hotel')
      .subscribe(hotels => {
        this.hotels = hotels.sort((a, b)=>a.id-b.id);
        this.displayedHotels = hotels.sort((a, b)=>a.id-b.id);
        //pongo el sort xq al hacer un put del primer id por ej. este se va a la ultima pos en el get
      });
  }


  ngOnInit() {
    
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


    this.checkRoute();




    this.getHoteles();


    //paginasion
   this.loadData();
  }


  checkRoute() {
    const currentRoute = this.router.url;
    this.showButton = currentRoute === '/typography';
  }



  toggleFilter(){
    // console.log(this.hotels.length)
    this.showFilters = !this.showFilters;
  }

  toggleSorter(){
    this.showSorters = !this.showSorters;
  }


  filter(name?:string, direccion?:string, telefono?:string, email?:string, sitioWeb?:string){
    
    const valuesAux : Criterio[] = [
      {name:"nombre", value:name},
      {name:"direccion", value:direccion},
      {name:"telefono", value:telefono},
      {name:"email", value:email},
      {name:"sitioWeb", value:sitioWeb}];
    const searchCriteria = [];
    valuesAux.forEach(value => {
      if(value.value!=='')
        searchCriteria.push(value)
    } );


    this.managementService.searchHotel(null, null, searchCriteria, "EQUALS")
    .subscribe(filteredHotels=>
      this.displayedHotels = filteredHotels
    )
  }



  //unused
  // handleSelection(swap?:string) {
  //   if(swap)
  //     this.invertirSeleccion = !this.invertirSeleccion;
  //   else
  //     this.invertirSeleccion = false
  
    
  //   switch(this.selectedOption){
  //     case 'Nombre':
  //       this.managementService.searchHotel("nombre", this.invertirSeleccion ? "DESC" : "ASC")
  //       .subscribe(sortedHotels =>
  //         this.displayedHotels = sortedHotels
  //       );
  //       break;

  //     case 'Direccion':
  //       this.managementService.searchHotel("direccion", this.invertirSeleccion ? "DESC" : "ASC")
  //       .subscribe(sortedHotels =>
  //         this.displayedHotels = sortedHotels
  //       );

  //       break;


  //     case 'Telefono':
  //       this.managementService.searchHotel("telefono", this.invertirSeleccion ? "DESC" : "ASC")
  //       .subscribe(sortedHotels =>
  //         this.displayedHotels = sortedHotels
  //       );

  //     break;
    
  //     case 'Email':
  //       this.managementService.searchHotel("email", this.invertirSeleccion ? "DESC" : "ASC")
  //       .subscribe(sortedHotels =>
  //         this.displayedHotels = sortedHotels
  //       );

  //     break;


  //     case 'Sitio-Web':
  //       this.managementService.searchHotel("sitioWeb", this.invertirSeleccion ? "DESC" : "ASC")
  //       .subscribe(sortedHotels =>
  //         this.displayedHotels = sortedHotels
  //       );

  //       break;
  //   }

  // }




  //paginator
  loadData() {
    
    this.displayedHotels = this.hotels.sort((a, b)=>a.id-b.id);

    // this.managementService.getAllRequest('hotel')
    // .subscribe(hotels => {
    //   this.displayedHotels = hotels.sort((a, b)=>a.id-b.id);
    //   //pongo el sort xq al hacer un put del primer id por ej. este se va a la ultima pos en el get
    // });

    this.updateDisplayedHosts();
  }

  updateDisplayedHosts() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedHotels = this.hotels.slice(startIndex, endIndex);
  }

  handlePageEvent(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    // this.updateDisplayedHosts();
    this.managementService.searchHotel(null,null,null,null,this.pageSize,this.currentPage)
    .subscribe(pagedHotels =>
      this.displayedHotels = pagedHotels
    )
  }




  showNotification(from :string, align:string, tipo:string){
    let mensaje = '';

    switch(tipo){
      case 'DEL':  mensaje = "Hotel eliminado correctamente";      mensaje=this.translateService.instant("hotel_eliminado");     break;
      case 'POST': mensaje = "Hotel creado correctamente";         mensaje=this.translateService.instant("hotel_creado");        break;
      case 'PUT':  mensaje = "Hotel actualizado correctamente";    mensaje=this.translateService.instant("hotel_actualizado");   break;

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
