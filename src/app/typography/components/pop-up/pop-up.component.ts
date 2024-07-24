import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ManagementService } from 'app/services/management.service';
import { Hotel } from 'app/interfaces/hotel.interface';




@Component({
    selector: 'hotel-pop-up',
    templateUrl: './pop-up.component.html',
    styleUrls: ['./pop-up.component.css']
})

export class PopUpComponent implements OnInit{
  //BORRAR
    // Lo suyo seria emitir un evento para que lo elimine table list, pero no funciona
    @Output()
    public onDeleteId: EventEmitter<string> = new EventEmitter();

    @Input()
    public onDelete: number = 0;

    @Input()
    public selectedIdHijo : number=0;


    public hotel : Hotel={
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


    constructor(private managementService : ManagementService,
      // public dialog: MatDialog
    ) { }


  ngOnInit(): void {

  }


    onSubmitDEL(){
        console.log(this.selectedIdHijo);
        this.managementService.deleteHost(this.selectedIdHijo)
        .subscribe();

     
      }


      postNewHost(){
        this.managementService.postNewHotel(this.hotel)
        .subscribe();
      }


      onSubmitPut(){
        this.managementService.putHotel(this.selectedIdHijo, this.hotel).subscribe();
      }

//no se usa. se pueden hacer cosas con formularios reactivos si da tiempo
      onSubmitPatch(id:number){
      
        
        // this.managementService.patchHotel(id, this.hotel)
        // .subscribe();
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