import { Component } from '@angular/core';
import { DailyReportService } from '../services/daily-report.service';
import { OnInit } from '@angular/core';
import { PrintingServiceService } from '../services/printing-service.service';

@Component({
  selector: 'app-daily-report',
  templateUrl: './daily-report.component.html',
  styleUrls: ['./daily-report.component.scss']
})
export class DailyReportComponent implements OnInit{
  
  dailyReport: any;

  constructor(
    private _dailyReportService: DailyReportService,
    private _printingService: PrintingServiceService
    ) {
  }

  ngOnInit(): void {
    this._dailyReportService.getDailyReport().subscribe((data) => {
      this.dailyReport = data;
    });
  }

  print(idDivToBePrint: string): void{
    this._printingService.printDivContent(idDivToBePrint);
  }

}
