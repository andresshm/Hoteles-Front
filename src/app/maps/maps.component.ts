import { Component, Input, OnInit } from "@angular/core";
import { Service } from "app/interfaces/service.interface";
import { ManagementService } from "app/services/management.service";

declare const google: any;
declare var $: any;
interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable?: boolean;
}
@Component({
  selector: "app-maps",
  templateUrl: "./maps.component.html",
  styleUrls: ["./maps.component.css"],
})
export class MapsComponent implements OnInit {
  @Input()
  nombre = "";

  @Input()
  descripcion = "";

  @Input()
  selectedId: number = 0;

  success: boolean=false;
  successMsg:string='';
  failMsg:string='';

  data: Service = {
    id: 0,
    nombre: "",
    descripcion: "",
    hoteles: [],
  };
  constructor(private managementService: ManagementService) {}

  onSubmit() {
    this.data.nombre = this.nombre;
    this.data.descripcion = this.descripcion;
    console.log(this.data);


    return new Promise<void>((resolve, reject) => {
        // Llamar al servicio y manejar la respuesta
        this.managementService.postNewService(this.data)
          .subscribe(
            () => {
              this.success = true; // Indicar que la operación fue exitosa
              console.log('Operación exitosa:', this.success);
              resolve(); // Resolver la promesa cuando la operación haya completado
            }
          );
      });


    // this.managementService.postNewService(this.data)
    // .subscribe(
    //     ()=>{
    //         this.success=true;
    //         console.log(this.success);
    //     }
    // );
  }
  onSubmitPUT() {
    this.data.nombre = this.nombre;
    this.data.descripcion = this.descripcion;

    return new Promise<void>((resolve, reject) => {
        // Llamar al servicio y manejar la respuesta
        this.managementService.putService(this.selectedId, this.data)
          .subscribe(
            () => {
              this.success = true; // Indicar que la operación fue exitosa
              console.log('Operación exitosa:', this.success);
              resolve(); // Resolver la promesa cuando la operación haya completado
            }
          );
      });

    // this.managementService.putService(this.selectedId, this.data).subscribe();
  }

  onSubmitDEL() {

    return new Promise<void>((resolve, reject) => {
        // Llamar al servicio y manejar la respuesta
        this.managementService.deleteService(this.selectedId)
          .subscribe(
            () => {
              this.success = true; // Indicar que la operación fue exitosa
              console.log('Operación exitosa:', this.success);
              resolve(); // Resolver la promesa cuando la operación haya completado
            }
          );
      });

    // this.managementService.deleteService(this.selectedId).subscribe();
  }

  async onSubmitAndShowNotification() {
    try {
      this.successMsg = "Servicio creado correctamente";
      this.failMsg = "Error al crear el servicio";
      await this.onSubmit(); // Espera a que onSubmit se complete
      this.showNotification('top', 'right', this.successMsg, this.failMsg); // Ejecuta showNotification después de onSubmit
      this.success=false; // lo reinicio a false y se pondra en true de nuevo si sale todo bn
    } catch (error) {
      console.error('Error en onSubmit:', error);
      // Manejar errores si es necesario
    }
  }
  async onSubmitPutAndShowNotification() {
    try {
      this.successMsg = "Servicio actualizado correctamente";
      this.failMsg = "Error al actualizar el servicio";
      await this.onSubmitPUT(); // Espera a que onSubmit se complete
      this.showNotification('top', 'right', this.successMsg, this.failMsg); // Ejecuta showNotification después de onSubmit
      this.success=false; // lo reinicio a false y se pondra en true de nuevo si sale todo bn
    } catch (error) {
        console.error('Error en onSubmit: falla?', error);
        // Manejar errores si es necesario
        this.showNotification('top', 'right', this.successMsg, this.failMsg); // Ejecuta showNotification después de onSubmit
    }
  }


  async onSubmitDeleteAndShowNotification() {

    try {
      this.successMsg = "Servicio eliminado correctamente";
      this.failMsg = "Error al eliminar el servicio";
      await this.onSubmitDEL(); // Espera a que onSubmit se complete      
      this.showNotification('top', 'right', this.successMsg, this.failMsg); // Ejecuta showNotification después de onSubmit
      this.success=false; // lo reinicio a false y se pondra en true de nuevo si sale todo bn
    } catch (error) {
        console.error('Error en onSubmit: falla?', error);
        // Manejar errores si es necesario
        this.showNotification('top', 'right', this.successMsg, this.failMsg); // Ejecuta showNotification después de onSubmit
    }
  }

  showNotification(from :string, align:string, successMsg: string, failMsg: string){
    // const type = ['','info','success','warning','danger'];

    // const color = Math.floor((Math.random() * 4) + 1);
    console.log(this.success);
    $.notify({
        icon: "notifications",
        message: (this.success) ? successMsg : failMsg

    },{
        type: (this.success) ? 'success' : 'danger', //type[color],
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

  ngOnInit() {
    /*var myLatlng = new google.maps.LatLng(40.748817, -73.985428);
    var mapOptions = {
        zoom: 13,
        center: myLatlng,
        scrollwheel: false, //we disable de scroll over the map, it is a really annoing when you scroll through page
        styles: [{
            "featureType": "water",
            "stylers": [{
                "saturation": 43
            }, {
                "lightness": -11
            }, {
                "hue": "#0088ff"
            }]
        }, {
            "featureType": "road",
            "elementType": "geometry.fill",
            "stylers": [{
                "hue": "#ff0000"
            }, {
                "saturation": -100
            }, {
                "lightness": 99
            }]
        }, {
            "featureType": "road",
            "elementType": "geometry.stroke",
            "stylers": [{
                "color": "#808080"
            }, {
                "lightness": 54
            }]
        }, {
            "featureType": "landscape.man_made",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#ece2d9"
            }]
        }, {
            "featureType": "poi.park",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#ccdca1"
            }]
        }, {
            "featureType": "road",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#767676"
            }]
        }, {
            "featureType": "road",
            "elementType": "labels.text.stroke",
            "stylers": [{
                "color": "#ffffff"
            }]
        }, {
            "featureType": "poi",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "landscape.natural",
            "elementType": "geometry.fill",
            "stylers": [{
                "visibility": "on"
            }, {
                "color": "#b8cb93"
            }]
        }, {
            "featureType": "poi.park",
            "stylers": [{
                "visibility": "on"
            }]
        }, {
            "featureType": "poi.sports_complex",
            "stylers": [{
                "visibility": "on"
            }]
        }, {
            "featureType": "poi.medical",
            "stylers": [{
                "visibility": "on"
            }]
        }, {
            "featureType": "poi.business",
            "stylers": [{
                "visibility": "simplified"
            }]
        }]

    };
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);

    var marker = new google.maps.Marker({
        position: myLatlng,
        title: "Hello World!"
    });

    // To add the marker to the map, call setMap();
    marker.setMap(map);*/
  }
}
