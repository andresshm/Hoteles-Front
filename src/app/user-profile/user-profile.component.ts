import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Host } from 'app/interfaces/host.interface';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { ManagementService } from 'app/services/management.service';
import { PopUpComponent } from 'app/shared/components/pop-up/pop-up.component';
import { ControllerComponent } from 'app/shared/controller/controller.component';


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
    private router : Router,
    private _dialog: MatDialog,
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
    this.router.events.subscribe(() => {
      this.checkRoute();
    });
    this.checkRoute();
     

    // Aqui se piden los huespedes a la API
    // para generar la lista en pantalla
   this.getHuespedes();


   //paginasion
   this.loadData();
  }

 

  getHuespedes() {
   
    this.managementService.getHostsRequest('huesped')
      .subscribe(hosts => {
        this.hosts = hosts.sort((a, b)=>a.id-b.id);
        this.displayedHosts = hosts.sort((a, b)=>a.id-b.id);
        //pongo el sort xq al hacer un put del primer id por ej. este se va a la ultima pos en el get
      });
  }

  onSubmitDEL(id:number){
    this.managementService.deleteHost(id).subscribe();
  }




  /* pone el indice de la fila en la que clico*/
  setIndex(id:number){
    this.selectedId=id;
    console.log(this.selectedId);
    this.managementService.getHostById(id, 'huesped').subscribe(host => this.host = host);

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


  filter(name:string, apellido:string, dni:string, procedencia:string, checkInD:string, checkInH:string, checkOutD:string, checkOutH:string){
    this.managementService.filterHost(name, apellido, dni, procedencia, checkInD, checkInH, checkOutD, checkOutH).subscribe(matchHosts => {
      this.displayedHosts = matchHosts;
      this.hosts = matchHosts
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
      case 'Nombre':
        this.displayedHosts= this.hosts.sort((a, b)=>{
          const nameA = a.nombre.toLowerCase();
          const nameB = b.nombre.toLowerCase();
          
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

      case 'Apellido':
        this.displayedHosts= this.hosts.sort((a, b)=>{
          const nameA = a.apellido.toLowerCase();
          const nameB = b.apellido.toLowerCase();
          
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


      case 'DNI/Pasaporte':

      this.displayedHosts= this.hosts.sort((a, b)=>{
        const nameA = a.dniPasaporte.toLowerCase();
        const nameB = b.dniPasaporte.toLowerCase();
        
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
    
      case 'Procedencia':

      this.displayedHosts= this.hosts.sort((a, b)=>{
        const nameA = a.procedencia.toLowerCase();
        const nameB = b.procedencia.toLowerCase();
        
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


      case 'Check-in':
        this.displayedHosts= this.hosts.sort((a, b) => {
          const parseDate = (dateString: string): number => {
            const [day, month, year, time] = dateString.split(/[- :]/);
            return new Date(`${year}-${month}-${day}T${time}:00`).getTime();
          };
        
          const dateA = parseDate(a.fechaCheckin.toString());
          const dateB = parseDate(b.fechaCheckin.toString());

          if(this.invertirSeleccion)
            return dateB - dateA; // Ordenar de más reciente a más antiguo
          else
            return dateA - dateB; // Ordenar de más reciente a más antiguo
        });
        break;


      case 'Check-out':
        this.displayedHosts= this.hosts.sort((a, b) => {
          const parseDate = (dateString: string): number => {
            const [day, month, year, time] = dateString.split(/[- :]/);
            return new Date(`${year}-${month}-${day}T${time}:00`).getTime();
          };
        
          const dateA = parseDate(a.fechaCheckout.toString());
          const dateB = parseDate(b.fechaCheckout.toString());

          if(this.invertirSeleccion)
            return dateB - dateA; // Ordenar de más reciente a más antiguo
          else
            return dateA - dateB; // Ordenar de más reciente a más antiguo
        });
        break;


    }
    // this.managementService.getHostsRequest('huesped').subscribe();

  }




  //paginator
  loadData() {
    // Simula la carga de datos

    this.managementService.getHostsRequest('huesped')
    .subscribe(hosts => {
      this.displayedHosts = hosts.sort((a, b)=>a.id-b.id);
      // this.displayedHosts=hosts.sort((a, b)=>a.id-b.id);
      //pongo el sort xq al hacer un put del primer id por ej. este se va a la ultima pos en el get
    });


    // this.displayedHosts = this.hosts;
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
    this.updateDisplayedHosts();
  }



  showNotification(from :string, align:string, tipo:string){
    let mensaje = '';

    switch(tipo){
      case 'DEL': mensaje = "Huésped eliminado correctamente";break;
      case 'POST': mensaje = "Huésped creado correctamente";break;
      case 'PUT': mensaje = "Huésped actualizado correctamente";break;

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
