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

    private url = 'http://localhost:8080/';


    constructor(private httpClient: HttpClient) { }

    //GET-ALL
    public getHostsRequest(entity: string): Observable<Host[]>{
        return this.httpClient.get<Host[]>(`${this.url}${entity}`)
        .pipe(
          catchError(()=>of([])),
        );
      }

//get by id
    public getHostById(id:number, entity: string): Observable<Host>{
        return this.httpClient.get<Host>(`${this.url}${entity}/${id}`)
        .pipe(
          catchError(()=>of()),
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
      //POST
      postNewHost(data : Host): Observable<Host> {
        return this.httpClient.post<Host>(`${this.url}huesped`, data)
        .pipe(
          catchError(()=>of()),
        );
      }


      postNewHotel(data : Hotel): Observable<Hotel> {
        return this.httpClient.post<Hotel>(`${this.url}hotel`, data)
        .pipe(
          catchError(()=>of()),
        );
      }
      
      postNewRoom(data : Room): Observable<Room> {
        return this.httpClient.post<Room>(`${this.url}habitacion`, data)
        .pipe(
          catchError(()=>of()),
        );
      }


      postNewService(data : Service): Observable<Service> {
        return this.httpClient.post<Service>(`${this.url}servicio`, data)
        .pipe(
          catchError(()=>of()),
        );
      }




      //PUT
      
      putHost(id:number, data : Host): Observable<Host> {
        return this.httpClient.put<Host>(`${this.url}huesped/${id}`, data)
        .pipe(
          catchError(()=>of()),
        );
      }

      patchHost(id:number, data : Host): Observable<Host> {
        return this.httpClient.patch<Host>(`${this.url}huesped/${id}`, data)
        .pipe(
          catchError(()=>of()),
        );
      }

      putHotel(id:number, data : Hotel): Observable<Hotel> {
        return this.httpClient.put<Hotel>(`${this.url}hotel/${id}`, data)
        .pipe(
          catchError(()=>of()),
        );
      }
     
      putRoom(id:number, data : Room): Observable<Room> {
        return this.httpClient.put<Room>(`${this.url}habitacion/${id}`, data)
        .pipe(
          catchError(()=>of()),
        );
      }

      putService(id:number, data : Service): Observable<Service> {
        return this.httpClient.put<Service>(`${this.url}servicio/${id}`, data)
        .pipe(
          catchError(()=>of()),
        );
      }
      




      //DELETE
      deleteHost(id:number): Observable<Host> {
        return this.httpClient.delete<Host>(`${this.url}huesped/${id}`)
        .pipe(
          catchError(()=>of()),
        );
      }

      
      deleteHotel(id:number): Observable<Hotel> {
        return this.httpClient.delete<Hotel>(`${this.url}hotel/${id}`)
        .pipe(
          catchError(()=>of()),
        );
      }

      deleteRoom(id:number): Observable<Room> {
        return this.httpClient.delete<Room>(`${this.url}habitacion/${id}`)
        .pipe(
          catchError(()=>of()),
        );
      }


      deleteService(id:number): Observable<Service> {
        return this.httpClient.delete<Service>(`${this.url}servicio/${id}`)
        .pipe(
          catchError(()=>of()),
        );
      }




      //filter
      filterHost(name:string, surname:string, dni:string, checkin:string, checkout:string) : Observable<Host[]>{


    const formData = {
      nombre: name.trim(),
      apellido: surname.trim(),
      documento: dni.trim(),
      checkIn: checkin.trim(),
      checkOut: checkout.trim()
    };
    
    let params = Object.keys(formData)
      .filter(key => formData[key])  // Include only non-empty values
      .map(key => `${key}=${encodeURIComponent(formData[key])}`) // Encode and concatenate
      .join('&');  // Join all parameters with '&'
    
    if (params) {
      params = '?' + params;
    }




        return this.httpClient.get<Host[]>(`${this.url}huesped/filter${params}`)
        .pipe(
          catchError(()=>of([])),
        );
      }

      
}