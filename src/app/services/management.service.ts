import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Host } from "app/interfaces/host.interface";
import { Observable, catchError, of } from "rxjs";
import { Service } from "app/interfaces/service.interface";
import { Hotel } from "app/interfaces/hotel.interface";
import { Room } from "app/interfaces/room.interface";
import { Criterio } from "app/interfaces/criterio.interface";
import { HuespedPorHotel } from "app/interfaces/huesped-por-hotel.interface";

@Injectable({ providedIn: "root" })
export class ManagementService {
  private url = "http://localhost:8080/";

  constructor(private httpClient: HttpClient) {}

  //GET-ALL
  public getHostsRequest(entity: string): Observable<Host[]> {
    return this.httpClient
      .get<Host[]>(`${this.url}${entity}`)
      .pipe(catchError(() => of([])));
  }


  public getRoomsRequest(entity: string): Observable<Room[]> {
    return this.httpClient
      .get<Room[]>(`${this.url}${entity}`)
      .pipe(catchError(() => of([])));
  }

  public getHotelsRequest(entity: string): Observable<Hotel[]> {
    return this.httpClient
      .get<Hotel[]>(`${this.url}${entity}`)
      .pipe(catchError(() => of([])));
  }
  
  public getServicesRequest(entity: string): Observable<Service[]> {
    return this.httpClient
      .get<Service[]>(`${this.url}${entity}`)
      .pipe(catchError(() => of([])));
  }


  
  //get by id
  public getHostById(id: number, entity: string): Observable<Host> {
    return this.httpClient
      .get<Host>(`${this.url}${entity}/${id}`)
      .pipe(catchError(() => of()));
  }
  public getHotelById(id: number, entity: string): Observable<Hotel> {
    return this.httpClient
      .get<Hotel>(`${this.url}${entity}/${id}`)
      .pipe(catchError(() => of()));
  }
  public getRoomById(id: number, entity: string): Observable<Room> {
    return this.httpClient
      .get<Room>(`${this.url}${entity}/${id}`)
      .pipe(catchError(() => of()));
  }
  public getServiceById(id: number, entity: string): Observable<Service> {
    return this.httpClient
      .get<Service>(`${this.url}${entity}/${id}`)
      .pipe(catchError(() => of()));
  }

  //manejar errores
  //POST
  postNewHost(data: Host): Observable<Host> {
    return this.httpClient
      .post<Host>(`${this.url}huesped`, data)
      .pipe(catchError(() => of()));
  }

  postNewHotel(data: Hotel): Observable<Hotel> {
    return this.httpClient
      .post<Hotel>(`${this.url}hotel`, data)
      .pipe(catchError(() => of()));
  }

  postNewRoom(data: Room): Observable<Room> {
    return this.httpClient
      .post<Room>(`${this.url}habitacion`, data)
      .pipe(catchError(() => of()));
  }

  postNewService(data: Service): Observable<Service> {
    return this.httpClient
      .post<Service>(`${this.url}servicio`, data)
      .pipe(catchError(() => of()));
  }

  //PUT

  putHost(id: number, data: Host): Observable<Host> {
    return this.httpClient
      .put<Host>(`${this.url}huesped/${id}`, data)
      .pipe(catchError(() => of()));
  }

  patchHost(id: number, data: Host): Observable<Host> {
    return this.httpClient
      .patch<Host>(`${this.url}huesped/${id}`, data)
      .pipe(catchError(() => of()));
  }

  putHotel(id: number, data: Hotel): Observable<Hotel> {
    return this.httpClient
      .put<Hotel>(`${this.url}hotel/${id}`, data)
      .pipe(catchError(() => of()));
  }

  putRoom(id: number, data: Room): Observable<Room> {
    return this.httpClient
      .put<Room>(`${this.url}habitacion/${id}`, data)
      .pipe(catchError(() => of()));
  }

  putService(id: number, data: Service): Observable<Service> {
    return this.httpClient
      .put<Service>(`${this.url}servicio/${id}`, data)
      .pipe(catchError(() => of()));
  }

  //DELETE
  deleteHost(id: number): Observable<Host> {
    return this.httpClient
      .delete<Host>(`${this.url}huesped/${id}`)
      .pipe(catchError(() => of()));
  }

  deleteHotel(id: number): Observable<Hotel> {
    return this.httpClient
      .delete<Hotel>(`${this.url}hotel/${id}`)
      .pipe(catchError(() => of()));
  }

  deleteRoom(id: number): Observable<Room> {
    return this.httpClient
      .delete<Room>(`${this.url}habitacion/${id}`)
      .pipe(catchError(() => of()));
  }

  deleteService(id: number): Observable<Service> {
    return this.httpClient
      .delete<Service>(`${this.url}servicio/${id}`)
      .pipe(catchError(() => of()));
  }


  getHuespedesPorHotel(): Observable<HuespedPorHotel[]>{
    return this.httpClient.get<HuespedPorHotel[]>(`${this.url}hotel/total`).pipe(catchError(() => of([])));
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

    console.log(data)


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

    console.log(data)


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
        "sortBy": sortBy || "nombre",
        "sentidoOrden": orden || "ASC"
      })
    }

    if(searchCriteria && operator ){
      
      searchCriteria.forEach((criteria)=>{
       
          criteriosBusqueda.push({
            "key": criteria.name || "nombre",
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

    console.log(data)


    return this.httpClient
    .post<Room[]>(`${this.url}habitacion/filterv2`, data)
    .pipe(catchError(()=>of([])))




    
  }







  //filter
  filterHost(
    name: string,
    surname: string,
    dni: string,
    procedencia: string,
    checkinD: string,
    checkinH: string,
    checkoutD: string,
    checkoutH: string
  ): Observable<Host[]> {
    let checkinDateD = "";
    let checkinDateH = "";
    let checkoutDateD = "";
    let checkoutDateH = "";

    if (checkinD) {
      let date = "";
      date = checkinD.replace(/-/g, "/");
      let [year, month, day] = date.split("/");
      let formattedDate = `${day}/${month}/${year}`;
      checkinDateD = `${formattedDate} 00:00`;
    }

    if (checkinH) {
      let date = "";
      date = checkinH.replace(/-/g, "/");
      let [year, month, day] = date.split("/");
      let formattedDate = `${day}/${month}/${year}`;
      checkinDateH = `${formattedDate} 00:00`;
    }

    if (checkoutD) {
      let date = "";
      date = checkoutD.replace(/-/g, "/");
      let [year, month, day] = date.split("/");
      let formattedDate = `${day}/${month}/${year}`;
      checkoutDateD = `${formattedDate} 00:00`;
    }

    if (checkoutH) {
      let date = "";
      date = checkoutH.replace(/-/g, "/");
      let [year, month, day] = date.split("/");
      let formattedDate = `${day}/${month}/${year}`;
      checkoutDateH = `${formattedDate} 00:00`;
    }

    const formData = {
      nombre: name.trim(),
      apellido: surname.trim(),
      documento: dni.trim(),
      procedencia: procedencia.trim(),
      checkInD: checkinDateD, //checkinD.trim(),
      checkInH: checkinDateH, //checkinH.trim(),
      checkOutD: checkoutDateD, //checkoutD.trim(),
      checkOutH: checkoutDateH, //checkoutH.trim()
    };

    let params = Object.keys(formData)
      .filter((key) => formData[key]) // Include only non-empty values
      .map((key) => `${key}=${encodeURIComponent(formData[key])}`) // Encode and concatenate
      .join("&"); // Join all parameters with '&'

    if (params) {
      params = "?" + params;
    }

    return this.httpClient
      .get<Host[]>(`${this.url}huesped/filter${params}`)
      .pipe(catchError(() => of([])));
  }

  filterHotel(
    name: string,
    direccion: string,
    telefono: string,
    email: string,
    sitioWeb: string
  ): Observable<Hotel[]> {
    const formData = {
      nombre: name,
      direccion: direccion,
      telefono: telefono.trim(),
      email: email.trim(),
      web: sitioWeb.trim(),
    };

    let params = Object.keys(formData)
      .filter((key) => formData[key]) // Include only non-empty values
      .map((key) => `${key}=${encodeURIComponent(formData[key])}`) // Encode and concatenate
      .join("&"); // Join all parameters with '&'

    if (params) {
      params = "?" + params;
    }

    return this.httpClient
      .get<Hotel[]>(`${this.url}hotel/filter${params}`)
      .pipe(catchError(() => of([])));
  }

  filterRoom(numero: string, precio: number, type: string): Observable<Room[]> {
    const formData = {
      numero,
      precio,
      tipo: type.trim(),
    };

    let params = Object.keys(formData)
      .filter((key) => formData[key]) // Include only non-empty values
      .map((key) => `${key}=${encodeURIComponent(formData[key])}`) // Encode and concatenate
      .join("&"); // Join all parameters with '&'

    if (params) {
      params = "?" + params;
    }

    return this.httpClient
      .get<Room[]>(`${this.url}habitacion/filter${params}`)
      .pipe(catchError(() => of([])));
  }

  filterService(nombre: string, descripcion: string): Observable<Service[]> {
    const formData = {
      nombre,
      descripcion: descripcion,
    };

    let params = Object.keys(formData)
      .filter((key) => formData[key]) // Include only non-empty values
      .map((key) => `${key}=${encodeURIComponent(formData[key])}`) // Encode and concatenate
      .join("&"); // Join all parameters with '&'

    if (params) {
      params = "?" + params;
    }

    return this.httpClient
      .get<Service[]>(`${this.url}servicio/filter${params}`)
      .pipe(catchError(() => of([])));
  }
}
