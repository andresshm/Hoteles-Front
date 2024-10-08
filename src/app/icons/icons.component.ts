import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Criterio } from 'app/interfaces/criterio.interface';

import { Room } from 'app/interfaces/room.interface';
import { ManagementService } from 'app/services/management.service';


declare var $: any;
@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.css']
})
export class IconsComponent implements OnInit {


  @Input()
  public selectedId : number = 0;

  public numero     :string = '';
  public tipo       :string = '';
  public precioNoche:number = 0;

  public showFilters      : boolean = false;
  public showSorters      : boolean = false;
  public invertirSeleccion: boolean = false;
  public selectedOption   : string  = '';

  displayedRooms: Room[] = [];
  pageSize      : number = 10;
  currentPage   : number =  0;

  public rooms : Room[] = [];
  public room  : Room;

  public showButton: boolean = false;
  
  constructor(
    private managementService : ManagementService,
    private router            : Router,
    private translateService  : TranslateService
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
    
    
    

    // comprueba donde estamos para sacar los edit y post adecuados
    this.checkRoute();
     

    // Aqui se piden los huespedes a la API
    // para generar la lista en pantalla
   this.getHabitaciones();


    //paginasion
    this.loadData();
  }

 

  getHabitaciones() {   
    this.managementService.getAllRequest('habitacion')
      .subscribe(rooms => {
        this.rooms = rooms.sort((a, b)=>a.id-b.id);
        this.displayedRooms = rooms.sort((a, b)=>a.id-b.id);
        //pongo el sort xq al hacer un put del primer id por ej. este se va a la ultima pos en el get
      });
  }

  onSubmitDEL(id:number){
    this.managementService.delete(id, 'habitacion').subscribe();
  }

  setIndex(id:number){
    this.selectedId=id;
    this.managementService.getById(id, 'habitacion').subscribe(room => this.room = room);
  }


  checkRoute() {
    const currentRoute = this.router.url;
    this.showButton = currentRoute === '/icons';
  }



  toggleFilter(){
    this.showFilters = !this.showFilters;
  }

  toggleSorter(){
    this.showSorters = !this.showSorters;
  }


  filter(numero:string, precioNoche:number, tipo:string){
    
    const valuesAux : Criterio[] = [
      {name:"numero", value:numero},
      {name:"tipo", value:tipo},
      {name:"precioNoche", value:precioNoche}];
    const searchCriteria :Criterio[] = [];
    valuesAux.forEach(value => {
      if(value.value!=='')
        searchCriteria.push(value)
    } );


    this.managementService.searchRoom(null, null, searchCriteria, "EQUALS")
    .subscribe(filteredRooms=>
      this.displayedRooms = filteredRooms
    )


  }



  //unused
  // handleSelection(swap?:string) {
  //   if(swap)
  //     this.invertirSeleccion = !this.invertirSeleccion;
  //   else
  //     this.invertirSeleccion = false
  
  //   switch(this.selectedOption){
  //     case 'Numero':
  //       this.managementService.searchRoom("numero", this.invertirSeleccion ? "DESC" : "ASC")
  //         .subscribe(sortedRooms =>
  //           this.displayedRooms = sortedRooms
  //         );

  //       break;

  //     case 'Tipo':

  //     this.managementService.searchRoom("tipo", this.invertirSeleccion ? "DESC" : "ASC")
  //         .subscribe(sortedRooms =>
  //           this.displayedRooms = sortedRooms
  //         );

  //       break;


  //     case 'Precio':
  //       this.managementService.searchRoom("precioNoche", this.invertirSeleccion ? "DESC" : "ASC")
  //       .subscribe(sortedRooms =>
  //         this.displayedRooms = sortedRooms
  //       );

  //     break;

  //   }

  // }




  //paginator
  loadData() {
    // Simula la carga de datos

    // this.managementService.getAllRequest('habitacion')
    // .subscribe(rooms => {
    //   this.displayedRooms = rooms.sort((a, b)=>a.id-b.id);
    //   //pongo el sort xq al hacer un put del primer id por ej. este se va a la ultima pos en el get
    // });


    this.displayedRooms = this.rooms.sort((a, b)=>a.id-b.id);
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
    // this.updateDisplayedHosts();
    this.managementService.searchRoom(null,null,null,null,this.pageSize,this.currentPage)
    .subscribe(pagedRooms =>
      this.displayedRooms = pagedRooms
    )
  }






  showNotification(from :string, align:string, tipo:string){
    let mensaje = '';

    switch(tipo){
      case 'DEL':  mensaje = "Habitación eliminada correctamente";    mensaje=this.translateService.instant("habitacion_eliminado");     break;
      case 'POST': mensaje = "Habitación creada correctamente";       mensaje=this.translateService.instant("habitacion_creado");        break;
      case 'PUT':  mensaje = "Habitación actualizada correctamente";  mensaje=this.translateService.instant("habitacion_actualizado");   break;
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
