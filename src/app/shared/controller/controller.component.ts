import { Component, OnInit } from '@angular/core';
import { ManagementService } from 'app/services/management.service';

@Component({
    selector: 'selector-name',
    templateUrl: './controller.component.html'
})

export class ControllerComponent implements OnInit {
//BORRAR
    constructor(private managementService : ManagementService) { }

  onSubmitDEL(id:number){
    console.log('llega')
    this.managementService.deleteHotel(id)
    .subscribe();
  }




    ngOnInit() { }
}