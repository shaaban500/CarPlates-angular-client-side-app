import { Component } from '@angular/core';
import { DailyReportService } from '../services/daily-report.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-daily-report',
  templateUrl: './daily-report.component.html',
  styleUrls: ['./daily-report.component.scss']
})
export class DailyReportComponent implements OnInit{
  
  dailyReport: any;

  constructor(
    private _dailyReportService: DailyReportService) {
  }

  ngOnInit(): void {
    this._dailyReportService.getDailyReport().subscribe((data) => {
      this.dailyReport = data;
    });
  }

  printTable() {
      window.print();
  }

}
