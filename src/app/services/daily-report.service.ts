import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DailyReportService {

  constructor(private _http: HttpClient) { }

  getDailyReport(): Observable<any> {
    return this._http.get('https://localhost:7137/CarPlates/GetDailyReport');
  }
}
