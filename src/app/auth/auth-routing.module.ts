import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdminLayoutComponent } from "app/layouts/admin-layout/admin-layout.component";
import { LoginComponent } from "./pages/login/login.component";




const routes: Routes = [
    {
      path: '',
      component: AdminLayoutComponent,
      children: [
        { path: 'login', component: LoginComponent },
        { path: '**', redirectTo: 'login' },
      ]
    }
  ];
  
  
  
  
  @NgModule({
    imports: [ RouterModule.forChild( routes ) ],
    exports: [ RouterModule ],
  })
  export class AuthRoutingModule { }