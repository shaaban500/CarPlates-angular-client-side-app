import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
@Injectable({
  providedIn: 'root'
})


export class PlateService {
  url : string = "https://localhost:7137/";

  constructor(private _http: HttpClient) { }

  addPlate(data : any): Observable<any> {
    return this._http.post(this.url + 'CarPlates', data);
  }

  addExecutedPlate(data : any): Observable<any> {
    return this._http.post(this.url + 'ExecutedPlates', data);
  }

  getCarStates(): Observable<any[]> {
    return this._http.get<any[]>(this.url + 'CarStates/GetAll');
  }

  getExecutedCarStates():Observable<any[]> {
    return this._http.get<any[]>(this.url + 'ExecutedCarStates/GetAll');
  }

  getCarTypes(): Observable<any[]> {
    return this._http.get<any[]>(this.url + 'CarTypes/GetAll');
  }
  
  getPlatesList(params?: any): Observable<any> {
      return this._http.post<any>(this.url + 'CarPlates/GetAll', params);
  }

  getExecutedPlatesList(params?: any): Observable<any> {
    return this._http.post<any>(this.url + `ExecutedPlates/GetAll`, params);
  }

  deletePlate(id: number): Observable<any> {
    return this._http.delete(`https://localhost:7137/CarPlates?id=${id}`);  
  }

  deleteExecutedPlate(id: number): Observable<any>{
    return this._http.delete(`https://localhost:7137/ExecutedPlates?id=${id}`);
  } 
}



