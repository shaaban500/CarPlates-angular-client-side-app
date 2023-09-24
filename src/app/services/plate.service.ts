import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
@Injectable({
  providedIn: 'root'
})


export class PlateService {

  constructor(private _http: HttpClient) { }

  addPlate(data : any): Observable<any> {
    return this._http.post('https://localhost:44334/CarPlates', data);
  }

  getCarStates(): Observable<any[]> {
    return this._http.get<any[]>('https://localhost:44334/CarStates/GetAll');
  }

  getCarTypes(): Observable<any[]> {
    return this._http.get<any[]>('https://localhost:44334/CarTypes/GetAll');
  }
  
  getPlatesList(params?: any): Observable<any> {
    if (!params) {
      return this._http.post<any>('https://localhost:44334/CarPlates/GetAll?carStateId=1&carTypeId=1', null);
    }

    const carStateId = parseInt(params.carStateId.toString());
    const carTypeId = parseInt(params.carTypeId.toString());

    return this._http.post<any>('https://localhost:44334/CarPlates/GetAll?carStateId=' + carStateId + '&carTypeId=' + carTypeId, null);
  }
}
