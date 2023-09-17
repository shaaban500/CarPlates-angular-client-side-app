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
    return this._http.post('https://localhost:7137/CarPlates', data);
  }

  getCarStates(): Observable<any[]> {
    return this._http.get<any[]>('https://localhost:7137/CarStates/GetAll');
  }

  getCarTypes(): Observable<any[]> {
    return this._http.get<any[]>('https://localhost:7137/CarTypes/GetAll');
  }
}
