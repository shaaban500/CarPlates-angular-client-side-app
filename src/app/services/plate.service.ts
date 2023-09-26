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

  addExecutedPlate(data : any): Observable<any> {
    return this._http.post('https://localhost:44334/ExecutedPlates', data);
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

  getExecutedPlatesList(params?: any): Observable<any> {
    if (!params) {
      return this._http.post<any>(`https://localhost:44334/ExecutedPlates/GetAll?carTypeId=1&executionYear=1&executionNumber=1`,null);  
    }

    const carTypeId = parseInt(params.carTypeId.toString());
    const year = parseInt(params.selectedYear.toString());
    const num = parseInt(params.selectedNumber.toString());

    return this._http.post<any>(`https://localhost:44334/ExecutedPlates/GetAll?carTypeId=${carTypeId}&executionYear=${year}&executionNumber=${num}`,null);  
    
  }

}



