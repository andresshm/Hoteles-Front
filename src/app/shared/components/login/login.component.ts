import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'app/interfaces/usuario.interface';
import { ManagementService } from 'app/services/management.service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']

})

export class LoginComponent implements OnInit {
    
    //@Input()
    nombre:string;

    //@Input()
    password:string;

    user:Usuario

    constructor(private managementService : ManagementService,
        private router: Router
    ) { }

    ngOnInit() { }


    addUser(){
        console.log(this.nombre, this.password)
        const usuario:Usuario = {
            nombre: this.nombre,
            password :this.password
        }
        this.managementService.addUsers(usuario).subscribe();

        this.router.navigate(['/dashboard']);
    }
}