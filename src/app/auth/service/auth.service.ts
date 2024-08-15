import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({providedIn: 'root'})
export class AuthService {
    private url = `http://localhost:${environment.port}/`;
    private token = 'tusmuertos';
    constructor(private httpClient:HttpClient) { }

    
  addUsers(data:any){
    return this.httpClient.post<any>(`${this.url}auth/register`, data).pipe(catchError(() => of()));
  }
  
  
  login(data:any): Observable<any> {
    return this.httpClient.post<any>(`${this.url}auth/login`, data).pipe(catchError(() => of(false)));
    
    
  }


  checkAuthentication(): Observable<boolean> {

    if ( !localStorage.getItem('jwt') ) return of(false);

    const token = localStorage.getItem('jwt');

    return of(true);

  }
    
}