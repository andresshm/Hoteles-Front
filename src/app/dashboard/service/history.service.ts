import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  private baseUrl: string = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getCounts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/history/count`);
  }

  getEntitiesByTypeAndDate(type: string, maxDate: string): Observable<any> {
    const params = new HttpParams().set('type', type).set('date', maxDate);
    return this.http.get(`${this.baseUrl}/history/entities`, { params });
  }

  getAllEntitiesByDate(date: string): Observable<any> {
    const types = ['Huesped', 'Habitacion', 'Hotel', 'Servicio'];
    const requests = types.map(type => this.getEntitiesByTypeAndDate(type, date));
    return forkJoin(requests);
  }
}