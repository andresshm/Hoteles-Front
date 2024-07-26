import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  public selectedId: number=0;
  public showButton: boolean = false;
 

  constructor(
    private managementService : ManagementService,
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
    
    
    
/* Checkeo de rutas*/
    this.router.events.subscribe(() => {
      this.checkRoute();
    });
    this.checkRoute();
     

    // Aqui se piden los huespedes a la API
    // para generar la lista en pantalla
   this.getHuespedes();
  }

 

  getHuespedes() {
   
    this.managementService.getHostsRequest('huesped')
      .subscribe(hosts => {
        this.hosts = hosts.sort((a, b)=>a.id-b.id);
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
  }


/* Comprueba donde estoy para que el boton flotante que es comun a todas
   las paginas sepa que cuadro de dialogo mostrar*/
  checkRoute() {
    const currentRoute = this.router.url;
    this.showButton = currentRoute === '/user-profile';
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
