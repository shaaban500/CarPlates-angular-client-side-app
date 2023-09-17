import { MatDialog } from '@angular/material/dialog';
import { PlateAddEditComponent } from './plate-add-edit/plate-add-edit.component';
import { PlateService } from './services/plate.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'crud-app';

  displayedColumns: string[] = [
    'id',
    'carTypeId',
    'carStateId',
    'letters',
    'numbers',
    'date',
    'ownerName',
    'ownerAdress',
    'ownerPhone',
    'ownerNationalId',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog: MatDialog, private _plateService: PlateService){}

  ngOnInit(): void {
    this.getPlatesList();
  }

  openAddEditPlateForm(){
    this._dialog.open(PlateAddEditComponent);
  }

  getPlatesList() {
    this._plateService.getPlatesList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
}
