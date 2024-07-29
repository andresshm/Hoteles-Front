import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Host } from 'app/interfaces/host.interface';
import { ManagementService } from 'app/services/management.service';
import { ControllerComponent } from 'app/shared/controller/controller.component';
declare var $: any;

const rtx5090 = {
  name: 'RTX 5090',
  price: 2500,
  inStorage: 6,
}

const hostAux: Host= {
  id: 0,
  idHabitacion: 0,
  nombre: "asd",
  apellido: "asd",
  dniPasaporte: "asd",
  fechaCheckin: 'asd',
  fechaCheckout: 'ads',
  procedencia: "valencia"
};

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  public myForm: FormGroup = this.fb.group({
    // name: ['', [ Validators.required, Validators.minLength(3) ] ],
    // price: [0, [ Validators.required, Validators.min(0) ] ],
    // inStorage: [0, [ Validators.required, Validators.min(0) ]],
    id:[0],
    idHabitacion:[0],
    nombre: [''],
    apellido: [''],
    dniPasaporte: [''],
    procedencia: [''],
    fechaCheckin: [''],
    fechaCheckout: [''],
  })

  constructor( private fb: FormBuilder ){}

  ngOnInit(): void {
    this.myForm.reset( hostAux );
  }

  isValidField( field: string ): boolean | null {
    return this.myForm.controls[field].errors
      && this.myForm.controls[field].touched;
  }

  getFieldError( field: string ): string | null {

    if ( !this.myForm.controls[field] ) return null;

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors) ) {
      switch( key ) {
        case 'required':
          return 'Este campo es requerido';

        case 'minlength':
          return `Mínimo ${ errors['minlength'].requiredLength } caracters.`;
      }
    }

    return null;
  }


  onSave():void {

    if ( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);

    // this.myForm.reset({ price: 0, inStorage: 0 });

  }


















 /* constructor() { }
  showNotification(from, align){
      const type = ['','info','success','warning','danger'];

      const color = Math.floor((Math.random() * 4) + 1);

      $.notify({
          icon: "notifications",
          message: "Welcome to <b>Material Dashboard</b> - a beautiful freebie for every web developer."

      },{
          type: type[color],
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
  }*/

}
