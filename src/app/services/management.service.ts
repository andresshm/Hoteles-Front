import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Host } from 'app/interfaces/host.interface';
import { Observable, catchError, of } from 'rxjs';
import { Service } from 'app/interfaces/service.interface';
import { Hotel } from 'app/interfaces/hotel.interface';
import { Room } from 'app/interfaces/room.interface';
import { Country } from 'app/interfaces/Country.interface';

@Injectable({providedIn: 'root'})
export class ManagementService {

    private url = 'http://localhost:8080/';//'https://proyectohoteles-1-qtfp.onrender.com/';


    constructor(private httpClient: HttpClient) { }

    public getHostsRequest(entity: string): Observable<Host[]>{
        return this.httpClient.get<Host[]>(`${this.url}${entity}`)
        .pipe(
          catchError(()=>of([])),
        );
      }
    public getRoomsRequest(entity: string): Observable<Room[]>{
        return this.httpClient.get<Room[]>(`${this.url}${entity}`)
        .pipe(
          catchError(()=>of([])),
        );
      }
    public getHotelsRequest(entity: string): Observable<Hotel[]>{
        return this.httpClient.get<Hotel[]>(`${this.url}${entity}`)
        .pipe(
          catchError(()=>of([])),
        );
      }
    public getServicesRequest(entity: string): Observable<Service[]>{
        return this.httpClient.get<Service[]>(`${this.url}${entity}`)
        .pipe(
          catchError(()=>of([])),
        );
      }

      //manejar errores
      postNewHost(data : Host): Observable<Host> {
        return this.httpClient.post<Host>(`${this.url}huesped`, data)
        .pipe(
          catchError(()=>of()),
        );
      }

      putHost(id:number, data : Host): Observable<Host> {
        return this.httpClient.put<Host>(`${this.url}huesped/${id}`, data)
        .pipe(
          catchError(()=>of()),
        );
      }
      
      deleteHost(id:number): Observable<Host> {
        return this.httpClient.delete<Host>(`${this.url}huesped/${id}`)
        .pipe(
          catchError(()=>of()),
        );
      }
}