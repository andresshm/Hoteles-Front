import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ManagementService } from 'app/services/management.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Host } from 'app/interfaces/host.interface';




@Component({
    selector: 'shared-pop-up',
    templateUrl: './pop-up.component.html',
    styleUrls: ['./pop-up.component.css']
})

export class PopUpComponent implements OnInit{
    // Lo suyo seria emitir un evento para que lo elimine table list, pero no funciona
    // @Output()
    // public onDelete : EventEmitter<number> =  new EventEmitter();

    @Input()
    public onDeleteId: number = 0;

    @Input()
    public selectedIdHijo : number=0;


    public host : Host={
      id: 0,
      idHabitacion: 0,
      nombre: '',
      apellido: '',
      dniPasaporte: '',
      fechaCheckin: undefined,
      fechaCheckout: undefined
    }


    constructor(private managementService : ManagementService,
      public dialog: MatDialog
    ) { }


  ngOnInit(): void {

  }


    onSubmitDEL(){
        console.log(this.selectedIdHijo);
        this.managementService.deleteHost(this.selectedIdHijo)
        .subscribe();

     
      }


      postNewHost(){
        this.managementService.postNewHost(this.host)
        .subscribe();
      }

      recharge(op:string){
        switch(op){
          case 'DEL':
            localStorage.setItem('notificacion', 'DEL');
            break;
          case 'POST':
            localStorage.setItem('notificacion', 'POST');
            break;
          case 'PUT':
            localStorage.setItem('notificacion', 'PUT');
            break;
        }
        window.location.reload();
      }


  
}