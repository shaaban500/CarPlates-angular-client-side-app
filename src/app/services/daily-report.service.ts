import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DailyReportService {
  url : string = "https://localhost:7137/";

  constructor(private _http: HttpClient) { }

  getDailyReport(): Observable<any> {
    return this._http.get(this.url + 'DailyReport/GetDailyReport');
  }
}
