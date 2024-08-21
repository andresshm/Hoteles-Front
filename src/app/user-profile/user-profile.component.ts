import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Criterio } from 'app/interfaces/criterio.interface';
import { Host } from 'app/interfaces/host.interface';
import { ManagementService } from 'app/services/management.service';


declare var $: any;
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],

})
export class UserProfileComponent implements OnInit {


  public hosts: Host[]= [];
  public host: Host;

  public name:string=''
  public surname:string=''
  public dni:string=''
  public procedencia:string=''
  public checkinD:string=''
  public checkinH:string=''
  public checkoutD:string=''
  public checkoutH:string=''

  public selectedId: number=0;
  public showButton: boolean = false;
 
  public showFilters: boolean = false;
  public showSorters: boolean = false;
  public invertirSeleccion: boolean = false;
  public selectedOption:string='';

  displayedHosts: Host[] = [];
  pageSize: number = 10;
  currentPage: number = 0;

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
    
    
    
/* Checkeo de rutas*/
    // this.router.events.subscribe(() => {
    //   this.checkRoute();
    // });
    this.checkRoute();
     

    // Aqui se piden los huespedes a la API
    // para generar la lista en pantalla
   this.getHuespedes();


   //paginasion
   this.loadData();
  }

 

  getHuespedes() {
   
    this.managementService.getAllRequest('huesped')
      .subscribe(hosts => {
        if(hosts){

          this.hosts = hosts.sort((a, b)=>a.id-b.id);
          this.displayedHosts = hosts.sort((a, b)=>a.id-b.id);
        }
        //pongo el sort xq al hacer un put del primer id por ej. este se va a la ultima pos en el get
      });
  }

  onSubmitDEL(id:number){
    this.managementService.delete(id, 'huesped').subscribe();
  }




  /* pone el indice de la fila en la que clico*/
  setIndex(id:number){
    this.selectedId=id;
    console.log(this.selectedId);
    this.managementService.getById(id, 'huesped').subscribe(host => this.host = host);

  }


/* Comprueba donde estoy para que el boton flotante que es comun a todas
   las paginas sepa que cuadro de dialogo mostrar*/
  checkRoute() {
    const currentRoute = this.router.url;
    this.showButton = currentRoute === '/user-profile';
  }


  toggleFilter(){
    console.log(this.hosts.length)

    this.showFilters = !this.showFilters;
  }

  toggleSorter(){
    this.showSorters = !this.showSorters;
  }


  filter(name?:string, apellido?:string, dni?:string, procedencia?:string, checkInD?:string, checkInH?:string, checkOutD?:string, checkOutH?:string){

    const valuesAux : Criterio[] = [
      {name:"nombre", value:name},
      {name:"apellido", value:apellido},
      {name:"dni", value:dni},
      {name:"procedencia", value:procedencia}];
      // {name:"checkInD", value:checkInD}
      // {name:"checkInH", value:checkInH}];
    const searchCriteria = [];
    valuesAux.forEach(value => {
      if(value.value!=='')
        searchCriteria.push(value)
    } );


    this.managementService.searchHost(null, null, searchCriteria, "EQUALS")
    .subscribe(filteredHosts=>
      this.displayedHosts = filteredHosts
    )

    
  }



  //A priori funciona bn
  handleSelection(swap?:string) {
    if(swap)
      this.invertirSeleccion = !this.invertirSeleccion;
    else
      this.invertirSeleccion = false
  
    console.log(this.selectedOption)
    switch(this.selectedOption){
      case 'Nombre':
        this.managementService.searchHost("nombre", this.invertirSeleccion ? "DESC" : "ASC")
        .subscribe(sortedHosts =>
          this.displayedHosts = sortedHosts
        );
          
        //   if(this.invertirSeleccion){
        //     this.managementService.searchHost("nombre", "DESC")
        //     .subscribe(sortedHosts =>
        //       this.displayedHosts = sortedHosts
        //     );

        //  }else{
        //   this.managementService.searchHost("nombre", "ASC")
        //   .subscribe(sortedHosts =>
        //     this.displayedHosts = sortedHosts
        //   );
        //  }
         
        break;

      case 'Apellido':
        this.managementService.searchHost("apellido", this.invertirSeleccion ? "DESC" : "ASC")
          .subscribe(sortedHosts =>
            this.displayedHosts = sortedHosts
          );


      //   if(this.invertirSeleccion){
      //     this.managementService.searchHost("apellido", "DESC")
      //     .subscribe(sortedHosts =>
      //       this.displayedHosts = sortedHosts
      //     );

      //  }else{
      //   this.managementService.searchHost("apellido", "ASC")
      //   .subscribe(sortedHosts =>
      //     this.displayedHosts = sortedHosts
      //   );
      //  }
        break;


      case 'DNI/Pasaporte':
        this.managementService.searchHost("dniPasaporte", this.invertirSeleccion ? "DESC" : "ASC")
        .subscribe(sortedHosts =>
          this.displayedHosts = sortedHosts
        );

      //   if(this.invertirSeleccion){
      //     this.managementService.searchHost("dniPasaporte", "DESC")
      //     .subscribe(sortedHosts =>
      //       this.displayedHosts = sortedHosts
      //     );

      //  }else{
      //   this.managementService.searchHost("dniPasaporte", "ASC")
      //   .subscribe(sortedHosts =>
      //     this.displayedHosts = sortedHosts
      //   );
      //  }
     
      break;
    
      case 'Procedencia':
        this.managementService.searchHost("procedencia", this.invertirSeleccion ? "DESC" : "ASC")
        .subscribe(sortedHosts =>
          this.displayedHosts = sortedHosts
        );

      //   if(this.invertirSeleccion){
      //     this.managementService.searchHost("procedencia", "DESC")
      //     .subscribe(sortedHosts =>
      //       this.displayedHosts = sortedHosts
      //     );

      //  }else{
      //   this.managementService.searchHost("procedencia", "ASC")
      //   .subscribe(sortedHosts =>
      //     this.displayedHosts = sortedHosts
      //   );
      //  }

      break;


      case 'Check-in':
        this.managementService.searchHost("fechaCheckin", this.invertirSeleccion ? "DESC" : "ASC")
          .subscribe(sortedHosts =>
            this.displayedHosts = sortedHosts
          );

      //   if(this.invertirSeleccion){
      //     this.managementService.searchHost("fechaCheckin", "DESC")
      //     .subscribe(sortedHosts =>
      //       this.displayedHosts = sortedHosts
      //     );

      //  }else{
      //   this.managementService.searchHost("fechaCheckin", "ASC")
      //   .subscribe(sortedHosts =>
      //     this.displayedHosts = sortedHosts
      //   );

        break;


      case 'Check-out':
        this.managementService.searchHost("fechaCheckout", this.invertirSeleccion ? "DESC" : "ASC")
          .subscribe(sortedHosts =>
            this.displayedHosts = sortedHosts
          );

      //   if(this.invertirSeleccion){
      //     this.managementService.searchHost("fechaCheckout", "DESC")
      //     .subscribe(sortedHosts =>
      //       this.displayedHosts = sortedHosts
      //     );

      //  }else{
      //   this.managementService.searchHost("fechaCheckout", "ASC")
      //   .subscribe(sortedHosts =>
      //     this.displayedHosts = sortedHosts
      //   );
      //  }
  
        break;


    }

  }




  //paginator
  loadData() {

    this.managementService.getAllRequest('huesped')
    .subscribe(hosts => {
      if(hosts)
        this.displayedHosts = hosts.sort((a, b)=>a.id-b.id);
      //pongo el sort xq al hacer un put del primer id por ej. este se va a la ultima pos en el get
    });

    this.updateDisplayedHosts();
  }

  updateDisplayedHosts() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedHosts = this.hosts.slice(startIndex, endIndex);
  }

  handlePageEvent(event: PageEvent) {
     this.currentPage = event.pageIndex;
     this.pageSize = event.pageSize;
    // this.updateDisplayedHosts();
    this.managementService.searchHost(null,null,null,null,this.pageSize,this.currentPage)
    .subscribe(pagedHosts =>
      this.displayedHosts = pagedHosts
    )
  }



  showNotification(from :string, align:string, tipo:string){
    let mensaje = '';

    switch(tipo){
      case 'DEL':  mensaje = "Huésped eliminado correctamente";     mensaje=this.translateService.instant("huesped_eliminado");   break;
      case 'POST': mensaje = "Huésped creado correctamente";        mensaje=this.translateService.instant("huesped_creado");   break;
      case 'PUT':  mensaje = "Huésped actualizado correctamente";   mensaje=this.translateService.instant("huesped_actualizado");   break;

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
