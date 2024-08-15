import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/auth/service/auth.service';
import { Usuario } from 'app/interfaces/usuario.interface';
import { ManagementService } from 'app/services/management.service';
import { environment } from 'environments/environment';

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

    token:string;

    user:Usuario

    constructor(private managementService : ManagementService,
        private authService:AuthService,
        private router: Router
    ) { }

    ngOnInit() { }


    login(){
        const data = {
            username : this.nombre,
            password: this.password
        }
        this.authService.login(data).subscribe(response => {
            environment.token = response.token;
            localStorage.setItem('jwt', response.token);
            console.log(environment.token);
            if(response)
                this.router.navigate(['/']);
        });

        // console.log(this.nombre, this.password)
        // const usuario:any = {
        //     username: this.nombre,
        //     password :this.password
        // }



        // this.checkUser(usuario).then(isUserValid => {
        //     if (isUserValid) {
        //         // Usuario válido
        //         this.router.navigate(['/']);
        //     } else {
        //         // Usuario no válido
        //         console.log('nombre o contraseña incorrecta')
        //     }
        // });

    }



    // async checkUser(usuario: any):Promise<boolean>{
        // try{
        //     // Espera a que la llamada a la API se complete
        // const users = await this.managementService.checkUser(usuario.password).toPromise();

        // // Busca el usuario en la lista de usuarios devuelta
        // const requestedUser = users.find(user => user.username === usuario.username);

        // // Retorna true si se encontró el usuario, de lo contrario retorna false
        // return requestedUser !== undefined;
        // }catch(error){
        //     return false;

        // }

    // }
}