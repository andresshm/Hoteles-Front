import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Host } from "app/interfaces/host.interface";
import { Observable, catchError, of } from "rxjs";
import { Service } from "app/interfaces/service.interface";
import { Hotel } from "app/interfaces/hotel.interface";
import { Room } from "app/interfaces/room.interface";
import { Criterio } from "app/interfaces/criterio.interface";
import { HuespedPorHotel } from "app/interfaces/huesped-por-hotel.interface";
import { Usuario } from "app/interfaces/usuario.interface";
import { environment } from "environments/environment";

@Injectable({ providedIn: "root" })
export class ManagementService {
  private url = environment.baseUrl;


  constructor(private httpClient: HttpClient) { }

  //GET-ALL



  public getAllRequest(entity: string): Observable<any[]> {
    return this.httpClient
      .get<any[]>(`${this.url}${entity}`)
      .pipe(catchError(() => of([])));
  }



  //borrar estas 4
  // public getHostsRequest(entity: string): Observable<Host[]> {
  //   return this.httpClient
  //     .get<Host[]>(`${this.url}${entity}`)
  //     .pipe(catchError(() => of([])));
  // }


  // public getRoomsRequest(entity: string): Observable<Room[]> {
  //   return this.httpClient
  //     .get<Room[]>(`${this.url}${entity}`)
  //     .pipe(catchError(() => of([])));
  // }

  // public getHotelsRequest(entity: string): Observable<Hotel[]> {
  //   return this.httpClient
  //     .get<Hotel[]>(`${this.url}${entity}`)
  //     .pipe(catchError(() => of([])));
  // }
  
  // public getServicesRequest(entity: string): Observable<Service[]> {
  //   return this.httpClient
  //     .get<Service[]>(`${this.url}${entity}`)
  //     .pipe(catchError(() => of([])));
  // }


  
  //get by id
  public getById(id: number, entity: string): Observable<any> {
    return this.httpClient
      .get<any>(`${this.url}${entity}/${id}`)
      .pipe(catchError(() => of()));
  }

  //borrar estas 4
  // public getHostById(id: number, entity: string): Observable<Host> {
  //   return this.httpClient
  //     .get<Host>(`${this.url}${entity}/${id}`)
  //     .pipe(catchError(() => of()));
  // }
  // public getHotelById(id: number, entity: string): Observable<Hotel> {
  //   return this.httpClient
  //     .get<Hotel>(`${this.url}${entity}/${id}`)
  //     .pipe(catchError(() => of()));
  // }
  // public getRoomById(id: number, entity: string): Observable<Room> {
  //   return this.httpClient
  //     .get<Room>(`${this.url}${entity}/${id}`)
  //     .pipe(catchError(() => of()));
  // }
  // public getServiceById(id: number, entity: string): Observable<Service> {
  //   return this.httpClient
  //     .get<Service>(`${this.url}${entity}/${id}`)
  //     .pipe(catchError(() => of()));
  // }

  //manejar errores
  //POST
  post(data: any, entity:string): Observable<any> {
    return this.httpClient
      .post<any>(`${this.url}${entity}`, data)
      .pipe(catchError(() => of()));
  }

  
  //borrar estas 4
  // postNewHost(data: Host): Observable<Host> {
  //   return this.httpClient
  //     .post<Host>(`${this.url}huesped`, data)
  //     .pipe(catchError(() => of()));
  // }

  // postNewHotel(data: Hotel): Observable<Hotel> {
  //   return this.httpClient
  //     .post<Hotel>(`${this.url}hotel`, data)
  //     .pipe(catchError(() => of()));
  // }

  // postNewRoom(data: Room): Observable<Room> {
  //   return this.httpClient
  //     .post<Room>(`${this.url}habitacion`, data)
  //     .pipe(catchError(() => of()));
  // }

  // postNewService(data: Service): Observable<Service> {
  //   return this.httpClient
  //     .post<Service>(`${this.url}servicio`, data)
  //     .pipe(catchError(() => of()));
  // }

  //PUT
  put(id: number, data: any, entity:string): Observable<any> {
    return this.httpClient
      .put<any>(`${this.url}${entity}/${id}`, data)
      .pipe(catchError(() => of()));
  }


  //borrar estas 4
  // putHost(id: number, data: Host): Observable<Host> {
  //   return this.httpClient
  //     .put<Host>(`${this.url}huesped/${id}`, data)
  //     .pipe(catchError(() => of()));
  // }

  // patchHost(id: number, data: Host): Observable<Host> {
  //   return this.httpClient
  //     .patch<Host>(`${this.url}huesped/${id}`, data)
  //     .pipe(catchError(() => of()));
  // }

  // putHotel(id: number, data: Hotel): Observable<Hotel> {
  //   return this.httpClient
  //     .put<Hotel>(`${this.url}hotel/${id}`, data)
  //     .pipe(catchError(() => of()));
  // }

  // putRoom(id: number, data: Room): Observable<Room> {
  //   return this.httpClient
  //     .put<Room>(`${this.url}habitacion/${id}`, data)
  //     .pipe(catchError(() => of()));
  // }

  // putService(id: number, data: Service): Observable<Service> {
  //   return this.httpClient
  //     .put<Service>(`${this.url}servicio/${id}`, data)
  //     .pipe(catchError(() => of()));
  // }

  //DELETE
  delete(id: number, entity:string): Observable<any> {
    return this.httpClient
      .delete<any>(`${this.url}${entity}/${id}`)
      .pipe(catchError(() => of()));
  }


  //borrar estas 4
  // deleteHost(id: number): Observable<Host> {
  //   return this.httpClient
  //     .delete<Host>(`${this.url}huesped/${id}`)
  //     .pipe(catchError(() => of()));
  // }

  // deleteHotel(id: number): Observable<Hotel> {
  //   return this.httpClient
  //     .delete<Hotel>(`${this.url}hotel/${id}`)
  //     .pipe(catchError(() => of()));
  // }

  // deleteRoom(id: number): Observable<Room> {
  //   return this.httpClient
  //     .delete<Room>(`${this.url}habitacion/${id}`)
  //     .pipe(catchError(() => of()));
  // }

  // deleteService(id: number): Observable<Service> {
  //   return this.httpClient
  //     .delete<Service>(`${this.url}servicio/${id}`)
  //     .pipe(catchError(() => of()));
  // }





  getHuespedesPorHotel(): Observable<HuespedPorHotel[]>{
    return this.httpClient.get<HuespedPorHotel[]>(`${this.url}hotel/total`).pipe(catchError(() => of([])));
  }


  getCounts(idHotel:number, fecha:string): Observable<number> {
    return this.httpClient.get<number>(`${this.url}history/count?idHotel=${idHotel}&fecha=${fecha}`).pipe(catchError(() => of()));
  }





  checkUser(password:string): Observable<Usuario[]>{
    return this.httpClient.get<Usuario[]>(`${this.url}users?password=${password}`).pipe(catchError(() => of([])));
  }


 



  //dynamic search
  searchHost(sortBy?:string, orden?:string, searchCriteria?:Criterio[], operator?:string, pageSize?:number, pageIndex?:number) : Observable<Host[]> {



    let data = {};
    let criteriosOrden : any[]=[];
    let criteriosBusqueda : any[]=[];
    let page : any;

    if(sortBy || orden){
      criteriosOrden.push({
        "sortBy": sortBy || "nombre",
        "sentidoOrden": orden || "ASC"
      })
    }

    if(searchCriteria && operator ){
      
      searchCriteria.forEach((criteria)=>{
          criteriosBusqueda.push({
            "key": criteria.name || "nombre",
            "operation": typeof criteria.value === 'string' ? "CONTAINS" : "GREATER_THAN",//operator || "EQUALS",   Con esto operator no hace falta
            "value": criteria.value || "juan carlos"
          })
        })
    }

  
      page = {
        "pageIndex": pageIndex || 0,
        "pageSize": pageSize || 10
      }
    

    data = {
      criteriosOrden,
      criteriosBusqueda,
      page
    }

    console.log(data)


    return this.httpClient
    .post<Host[]>(`${this.url}huesped/filterv2`, data)
    .pipe(catchError(()=>of([])))




    
  }




  searchHotel(sortBy?:string, orden?:string, searchCriteria?:Criterio[], operator?:string, pageSize?:number, pageIndex?:number) : Observable<Hotel[]> {



    let data = {};
    let criteriosOrden : any[]=[];
    let criteriosBusqueda : any[]=[];
    let page : any;

    if(sortBy || orden){
      criteriosOrden.push({
        "sortBy": sortBy || "nombre",
        "sentidoOrden": orden || "ASC"
      })
    }

    if(searchCriteria && operator ){
      
      searchCriteria.forEach((criteria)=>{
          criteriosBusqueda.push({
            "key": criteria.name || "nombre",
            "operation": typeof criteria.value === 'string' ? "CONTAINS" : "GREATER_THAN",//operator || "EQUALS",   Con esto operator no hace falta
            "value": criteria.value || "juan carlos"
          })
        })
    }

  
      page = {
        "pageIndex": pageIndex || 0,
        "pageSize": pageSize || 10
      }
    

    data = {
      criteriosOrden,
      criteriosBusqueda,
      page
    }

   return this.httpClient
    .post<Hotel[]>(`${this.url}hotel/filterv2`, data)
    .pipe(catchError(()=>of([])))
    
  }



  searchService(sortBy?:string, orden?:string, searchCriteria?:Criterio[], operator?:string, pageSize?:number, pageIndex?:number) : Observable<Service[]> {



    let data = {};
    let criteriosOrden : any[]=[];
    let criteriosBusqueda : any[]=[];
    let page : any;

    if(sortBy || orden){
      criteriosOrden.push({
        "sortBy": sortBy || "nombre",
        "sentidoOrden": orden || "ASC"
      })
    }

    if(searchCriteria && operator ){
      
      searchCriteria.forEach((criteria)=>{
          criteriosBusqueda.push({
            "key": criteria.name || "nombre",
            "operation": typeof criteria.value === 'string' ? "CONTAINS" : "GREATER_THAN",//operator || "EQUALS",   Con esto operator no hace falta
            "value": criteria.value || "juan carlos"
          })
        })
    }

  
      page = {
        "pageIndex": pageIndex || 0,
        "pageSize": pageSize || 10
      }
    

    data = {
      criteriosOrden,
      criteriosBusqueda,
      page
    }

    return this.httpClient
    .post<Service[]>(`${this.url}servicio/filterv2`, data)
    .pipe(catchError(()=>of([])))

  }



  searchRoom(sortBy?:string, orden?:string, searchCriteria?:Criterio[], operator?:string, pageSize?:number, pageIndex?:number) : Observable<Room[]> {



    let data = {};
    let criteriosOrden : any[]=[];
    let criteriosBusqueda : any[]=[];
    let page : any;

    if(sortBy || orden){
      criteriosOrden.push({
        "sortBy": sortBy || "numero",
        "sentidoOrden": orden || "ASC"
      })
    }

    if(searchCriteria && operator ){
      
      searchCriteria.forEach((criteria)=>{
       
          criteriosBusqueda.push({
            "key": criteria.name || "numero",
            "operation": criteria.name === 'precioNoche' ? "GREATER_THAN" : "CONTAINS",//operator || "EQUALS",   Con esto operator no hace falta
            "value": criteria.value || "juan carlos"
          })
        })
    }

  
      page = {
        "pageIndex": pageIndex || 0,
        "pageSize": pageSize || 10
      }
    

    data = {
      criteriosOrden,
      criteriosBusqueda,
      page
    }

    return this.httpClient
    .post<Room[]>(`${this.url}habitacion/filterv2`, data)
    .pipe(catchError(()=>of([])))
    
  }


}
