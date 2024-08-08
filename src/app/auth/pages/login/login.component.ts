import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'app/interfaces/usuario.interface';
import { ManagementService } from 'app/services/management.service';

@Component({
    selector: 'auth-login',
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



        this.checkUser(usuario).then(isUserValid => {
            if (isUserValid) {
                // Usuario válido
                this.router.navigate(['/']);
            } else {
                // Usuario no válido
                console.log('nombre o contraseña incorrecta')
            }
        });

    }



    async checkUser(usuario: Usuario):Promise<boolean>{
        try{
            // Espera a que la llamada a la API se complete
        const users = await this.managementService.checkUser(usuario.password).toPromise();

        // Busca el usuario en la lista de usuarios devuelta
        const requestedUser = users.find(user => user.nombre === usuario.nombre);

        // Retorna true si se encontró el usuario, de lo contrario retorna false
        return requestedUser !== undefined;
        }catch(error){
            return false;

        }

    }
}