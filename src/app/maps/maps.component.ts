import { Component, Input, OnInit } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { Router } from "@angular/router";
import { Criterio } from "app/interfaces/criterio.interface";
import { Service } from "app/interfaces/service.interface";
import { ManagementService } from "app/services/management.service";

// declare const google: any;
declare var $: any;

@Component({
  selector: "app-maps",
  templateUrl: "./maps.component.html",
  styleUrls: ["./maps.component.css"],
})
export class MapsComponent implements OnInit {


  @Input()
  selectedId: number = 0;
 
  public nombre     :string = ""; 
  public descripcion:string = "";

  public showFilters      : boolean = false;
  public showSorters      : boolean = false;
  public invertirSeleccion: boolean = false;
  public selectedOption   : string  =    '';

  displayedServices : Service[] = [];
  pageSize          : number    = 10;
  currentPage       : number    =  0;

  showButton: boolean=false;

  public services : Service[] = [];
  public service  : Service;

  
  constructor(
    private managementService : ManagementService,
    private router            : Router
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
   this.getServices();



    //paginasion
    this.loadData();
  }

 

  getServices() {

    this.managementService.getServicesRequest('servicio')
      .subscribe(servs => {
        this.services = servs.sort((a, b)=>a.id-b.id);
        this.displayedServices = servs.sort((a, b)=>a.id-b.id);
        //pongo el sort xq al hacer un put del primer id por ej. este se va a la ultima pos en el get
      });
  }

  onSubmitDEL(id:number){
    this.managementService.deleteService(id).subscribe();
  }

  setIndex(id:number){
    this.selectedId=id;
    this.managementService.getServiceById(id, 'servicio').subscribe(service => this.service = service);
  }


  checkRoute() {
    const currentRoute = this.router.url;
    this.showButton = currentRoute === '/maps';
  }



  toggleFilter(){
    this.showFilters = !this.showFilters;
  }

  toggleSorter(){
    this.showSorters = !this.showSorters;
  }


  filter(nombre:string, descripcion:string){
    // this.managementService.filterService(nombre, descripcion).subscribe(matchServices => {
    //   this.services = matchServices;
    //   this.displayedServices = matchServices;
    // });

    const valuesAux : Criterio[] = [
      {name:"nombre", value:nombre},
      {name:"descripcion", value:descripcion}];
    const searchCriteria = [];
    valuesAux.forEach(value => {
      if(value.value!=='')
        searchCriteria.push(value)
    } );


    this.managementService.searchService(null, null, searchCriteria, "EQUALS")
    .subscribe(filteredServices=>
      this.displayedServices = filteredServices
    )
  }



  //A priori funciona bn
  handleSelection(swap?:string) {
    if(swap)
      this.invertirSeleccion = !this.invertirSeleccion;
    else
      this.invertirSeleccion = false
  
    switch(this.selectedOption){
      case 'Nombre':
        if(this.invertirSeleccion){
          this.managementService.searchService("nombre", "DESC")
          .subscribe(sortedServices =>
            this.displayedServices = sortedServices
          );

       }else{
        this.managementService.searchService("nombre", "ASC")
        .subscribe(sortedServices =>
          this.displayedServices = sortedServices
        );
       }
        break;

      case 'Descripcion':
        if(this.invertirSeleccion){
          this.managementService.searchService("descripcion", "DESC")
          .subscribe(sortedServices =>
            this.displayedServices = sortedServices
          );

       }else{
        this.managementService.searchService("descripcion", "ASC")
        .subscribe(sortedServices =>
          this.displayedServices = sortedServices
        );
       }
        break;

    }


  }



  //paginator
  loadData() {
    // Simula la carga de datos

    this.managementService.getServicesRequest('servicio')
    .subscribe(services => {
      this.displayedServices = services.sort((a, b)=>a.id-b.id);
      //pongo el sort xq al hacer un put del primer id por ej. este se va a la ultima pos en el get
    });
    this.updateDisplayedHosts();
  }

  updateDisplayedHosts() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedServices = this.services.slice(startIndex, endIndex);
  }

  handlePageEvent(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    // this.updateDisplayedHosts();
    this.managementService.searchService(null,null,null,null,this.pageSize,this.currentPage)
    .subscribe(pagedServices =>
      this.displayedServices = pagedServices
    )
  }




  showNotification(from :string, align:string, tipo:string){
    let mensaje = '';

    switch(tipo){
      case 'DEL': mensaje = "Servicio eliminado correctamente";break;
      case 'POST': mensaje = "Servicio creado correctamente";break;
      case 'PUT': mensaje = "Servicio actualizado correctamente";break;

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
