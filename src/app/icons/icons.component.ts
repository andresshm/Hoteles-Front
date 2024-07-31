import { Component, Host, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Room } from 'app/interfaces/room.interface';
import { ManagementService } from 'app/services/management.service';


declare var $: any;
@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.css']
})
export class IconsComponent implements OnInit {

  // @Input()
  // numero = '';
  
  // @Input()
  // tipo='';

  // @Input()
  // precioNoche=0;

  @Input()
  selectedId : number = 0;


  public numero:string  = '';
  public tipo:string ='';
  public precioNoche:number =0;


  public showFilters: boolean = false;
  public showSorters: boolean = false;
  public invertirSeleccion: boolean = false;
  public selectedOption:string='';


 displayedRooms: Room[] = [];
 pageSize: number = 10;
 currentPage: number = 0;

  public rooms : Room[] = [];
  public room : Room;

  data: Room = {
    id: 0,
    idHotel: 0,
    numero: '',
    tipo: '',
    precioNoche: 0,
    huespedes: [],
    hotel: undefined
  };

  public showButton: boolean = false;
  
  constructor(private managementService : ManagementService,
    private router : Router
  ) { }


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
    
    
    

    this.router.events.subscribe(() => {
      this.checkRoute();
    });
    this.checkRoute();
     

    // Aqui se piden los huespedes a la API
    // para generar la lista en pantalla
   this.getHabitaciones();


    //paginasion
    this.loadData();
  }

 

  getHabitaciones() {
   
    this.managementService.getRoomsRequest('habitacion')
      .subscribe(rooms => {
        this.rooms = rooms.sort((a, b)=>a.id-b.id);
        this.displayedRooms = rooms.sort((a, b)=>a.id-b.id);
        //pongo el sort xq al hacer un put del primer id por ej. este se va a la ultima pos en el get
      });
  }

  onSubmitDEL(id:number){
    
    this.managementService.deleteRoom(id)
    .subscribe();
  }

  setIndex(id:number){
    this.selectedId=id;
    console.log(this.selectedId);
    this.managementService.getRoomById(id, 'habitacion').subscribe(room => this.room = room);

  }


  checkRoute() {
    const currentRoute = this.router.url;
    this.showButton = currentRoute === '/icons';
  }



  toggleFilter(){
    console.log(this.rooms.length)

    this.showFilters = !this.showFilters;
  }

  toggleSorter(){
    this.showSorters = !this.showSorters;
  }


  filter(numero:string, precioNoche:number, tipo:string){
    this.managementService.filterRoom(numero, precioNoche, tipo).subscribe(matchRooms => {
      this.rooms = matchRooms;
      this.displayedRooms = matchRooms;
    });    
  }



  //A priori funciona bn
  handleSelection(swap?:string) {
    if(swap)
      this.invertirSeleccion = !this.invertirSeleccion;
    else
      this.invertirSeleccion = false
  
    console.log(this.selectedOption)
    switch(this.selectedOption){
      case 'Numero':
        this.displayedRooms= this.rooms.sort((a, b)=>{
          const nameA = a.numero.toLowerCase();
          const nameB = b.numero.toLowerCase();
          
          if(this.invertirSeleccion){
            if (nameA < nameB) return 1;
            if (nameA > nameB) return -1;

         }else{
           if (nameA < nameB) return -1;
           if (nameA > nameB) return 1;
         }
          return 0;
        });
        break;

      case 'Tipo':
        this.displayedRooms= this.rooms.sort((a, b)=>{
          const nameA = a.tipo.toLowerCase();
          const nameB = b.tipo.toLowerCase();
          
          if(this.invertirSeleccion){
            if (nameA < nameB) return 1;
            if (nameA > nameB) return -1;

         }else{

           if (nameA < nameB) return -1;
           if (nameA > nameB) return 1;
         }
          return 0;
        });
        break;


      case 'Precio':

      this.displayedRooms= this.rooms.sort((a, b)=>{
        const nameA = a.precioNoche;
        const nameB = b.precioNoche;
        

        if(this.invertirSeleccion)
          return nameB - nameA; // Ordenar de más reciente a más antiguo
        else
          return nameA - nameB; // Ordenar de más reciente a más antiguo
      });
      break;

    }

    // this.managementService.getRoomsRequest('habitacion').subscribe();

  }




  //paginator
  loadData() {
    // Simula la carga de datos

    this.managementService.getRoomsRequest('habitacion')
    .subscribe(rooms => {
      this.displayedRooms = rooms.sort((a, b)=>a.id-b.id);
      // this.displayedRooms=hosts.sort((a, b)=>a.id-b.id);
      //pongo el sort xq al hacer un put del primer id por ej. este se va a la ultima pos en el get
    });


    // this.displayedRooms = this.hosts;
    this.updateDisplayedHosts();
  }

  updateDisplayedHosts() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedRooms = this.rooms.slice(startIndex, endIndex);
  }

  handlePageEvent(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updateDisplayedHosts();
  }






  showNotification(from :string, align:string, tipo:string){
    // const type = ['','info','success','warning','danger'];

    // const color = Math.floor((Math.random() * 4) + 1);
    let mensaje = '';

    switch(tipo){
      case 'DEL': mensaje = "Habitación eliminada correctamente";break;
      case 'POST': mensaje = "Habitación creada correctamente";break;
      case 'PUT': mensaje = "Habitación actualizada correctamente";break;

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
