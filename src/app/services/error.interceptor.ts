import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        // Aquí puedes manejar el error, mostrar un mensaje al usuario, etc.
        console.error('Error in HTTP call:', error);
        return throwError(() => new Error(error.message));  // Lanza el error para que pueda ser manejado por el servicio que lo llamó si es necesario.
      })
    );
  }
}