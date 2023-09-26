import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DailyReportComponent } from './daily-report/daily-report.component';
import { PlateAddEditComponent } from './plate-add-edit/plate-add-edit.component';
import { PaltesComponent } from './paltes/paltes.component';
import { ExecutedPlatesComponent } from './executed-plates/executed-plates.component';
import { EntryPageComponent } from './entry-page/entry-page.component';

const routes: Routes = [
  { path: 'daily-report', component: DailyReportComponent },
  { path: 'plate-add-edit', component: PlateAddEditComponent },
  { path: 'plates', component: PaltesComponent },
  { path: 'executed-plates', component: ExecutedPlatesComponent },
  { path: 'entry-page', component: EntryPageComponent},
  { path: '', redirectTo: '/entry-page', pathMatch: 'full' }, // Default route
//  { path: '**', redirectTo: '/daily-report' }, // Redirect to daily-report for any other route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



