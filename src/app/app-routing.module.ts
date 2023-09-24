import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DailyReportComponent } from './daily-report/daily-report.component';
import { PlateAddEditComponent } from './plate-add-edit/plate-add-edit.component';

const routes: Routes = [
  { path: 'daily-report', component: DailyReportComponent },
  { path: 'plate', component: PlateAddEditComponent },
//  { path: '', redirectTo: '/daily-report', pathMatch: 'full' }, // Default route
//  { path: '**', redirectTo: '/daily-report' }, // Redirect to daily-report for any other route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



