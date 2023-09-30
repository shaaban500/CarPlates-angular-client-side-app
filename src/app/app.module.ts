import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { PlateAddEditComponent } from './plate-add-edit/plate-add-edit.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PlateService } from './services/plate.service';
import { MatTableModule } from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Component, OnInit, ViewChild } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { DailyReportComponent } from './daily-report/daily-report.component';
import { RouterModule, Routes } from '@angular/router';
import { PaltesComponent } from './paltes/paltes.component';
import { ExecutedPlatesComponent } from './executed-plates/executed-plates.component';
import { ExecutedPlatesAddEditComponent } from './executed-plates-add-edit/executed-plates-add-edit.component';
import { EntryPageComponent } from './entry-page/entry-page.component';


@NgModule({
  declarations: [
    AppComponent,
    PlateAddEditComponent,
    DailyReportComponent,
    PaltesComponent,
    ExecutedPlatesComponent,
    ExecutedPlatesAddEditComponent,
    EntryPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
  ],
  providers: [
    PlateService,
    PaltesComponent,
    PlateAddEditComponent,
    ExecutedPlatesComponent,
    ExecutedPlatesAddEditComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
