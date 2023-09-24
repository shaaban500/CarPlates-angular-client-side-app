import { MatDialog } from '@angular/material/dialog';
import { PlateAddEditComponent } from './plate-add-edit/plate-add-edit.component';
import { PlateService } from './services/plate.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'crud-app';

  searchForm: FormGroup;
  
  carTypes: any[] = [];
  carStates: any[] = [];
  selectedCarType: string | undefined;
  selectedCarState: string | undefined;

  carStateValue : string = "";
  carTypeValue : string = "";

  displayedColumns: string[] = [
    'id',
    'letters',
    'numbers',
    'date',
    'ownerName',
    'ownerAdress',
    'ownerPhone',
    'ownerNationalId',
    'action'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _plateService: PlateService,
    private _formBuilder: FormBuilder
    ){
      this.searchForm = this._formBuilder.group({
        carTypeId: '',
        carStateId: '',
      });
    }

  ngOnInit(): void {
    
    this.getPlatesList();
    
    this._plateService.getCarTypes().subscribe((data) => {
      this.carTypes = data;
    });
  
    this._plateService.getCarStates().subscribe((data) => {
      this.carStates = data;
    });
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
  

  onSearchFormSubmit(){
    if (this.searchForm.valid) {
      this._plateService.getPlatesList(this.searchForm.value).subscribe({
        next: (res) => {
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;

          if (res.length > 0) {
            const firstCarState = res[0].carState;
          
            if (firstCarState != null) {
              this.carStateValue = firstCarState.state.toString();
            }

            const firstCarType = res[0].carType;
          
            if (firstCarType != null) {
              this.carTypeValue = firstCarType.type.toString();
            }
          }

        },
        error: console.log,
      });
    }

  }
  
}
