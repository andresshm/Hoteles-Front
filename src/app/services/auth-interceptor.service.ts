import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ManagementService } from './management.service';
import { environment } from 'environments/environment';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Obtener el token JWT de localStorage
        const token = localStorage.getItem('jwt');
        console.log(token)
    
        if (req.url.includes('/login') || req.url.includes('/register') ) {
          // Si la URL contiene /login o /register, no añadas el token
          return next.handle(req);
        
        }

        // const cloned = req.clone(
        //   {headers: req.headers.set('Content-Type', 'application/json; charset=utf-8')});


        // Si el token existe, clonar la solicitud y agregar el encabezado de autorización
        if (token) {
          const cloned = req.clone({
            headers: req.headers.append('Authorization', `Bearer ${token.trim()}`),
          });
    
          return next.handle(cloned);
        } else {
          return next.handle(req);
        }
      }


      
}
