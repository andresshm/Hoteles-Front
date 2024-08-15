import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorsService } from 'app/auth/service/validators.service';
import { ManagementService } from 'app/services/management.service';
import {EmailValidator} from 'app/auth/validators/email-validator.service'
import { AuthService } from 'app/auth/service/auth.service';


@Component({
    selector: 'pages-register',
    templateUrl: './register.component.html',
    styleUrls:['./register.component.css']
})

export class RegisterComponent implements OnInit {
    public username:string;
    public firstname:string;
    public secondname:string;
    public location:string;
    public email:string;
    public password:string;
    public confirmPassword:string;


    public myForm: FormGroup = this.fb.group({
        name: ['', [ Validators.required, Validators.pattern( this.validatorsService.firstNameAndLastnamePattern )  ]],
        email: ['', [ Validators.required, Validators.pattern( this.validatorsService.emailPattern )], [ this.emailValidator ]],
        username: ['', [ Validators.required, this.validatorsService.cantBeStrider ]],
        password: ['', [ Validators.required, Validators.minLength(6) ]],
        password2: ['', [ Validators.required ]],
      }, {
        validators: [
          this.validatorsService.isFieldOneEqualFieldTwo('password','password2')
        ]
      });

    constructor(private managementService: ManagementService,
        private router:Router,
        private fb : FormBuilder,
        private emailValidator : EmailValidator,
        private validatorsService : ValidatorsService,
        private authService:AuthService
    ) { }

    ngOnInit() { }


    isValidField( field: string ) {
        return this.validatorsService.isValidField( this.myForm, field );
      }
    
      onSubmit() {
        this.myForm.markAllAsTouched();
      }

    register(){
        if(this.checkUser()){

            const usuario = {
              username: this.username,
              password: this.password,
              firstname: this.firstname,
              lastname: this.secondname,
              location: this.location,
              role: 'USER'
            }
            this.authService.addUsers(usuario).subscribe();
            this.router.navigate(['/login'])

        }

    }


    checkUser(){
        return this.password===this.confirmPassword;
    }
}