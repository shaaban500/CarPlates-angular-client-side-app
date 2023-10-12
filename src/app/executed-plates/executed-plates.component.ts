import { MatDialog } from '@angular/material/dialog';
import { PlateService } from '../services/plate.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExecutedPlatesAddEditComponent } from '../executed-plates-add-edit/executed-plates-add-edit.component';
import { PrintingServiceService } from '../services/printing-service.service';

@Component({
  selector: 'app-executed-plates',
  templateUrl: './executed-plates.component.html',
  styleUrls: ['./executed-plates.component.scss']
})
export class ExecutedPlatesComponent implements OnInit {
  searchForm: FormGroup;
  
  years: any[] = [];
  numbers: any[] = [];
  carTypes: any[] = [];

  carTypeValue : string = "";

  displayedColumns: string[] = [
    'id',
    'letters',
    'numbers',
    'date',
    'action'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _plateService: PlateService,
    private _formBuilder: FormBuilder,
    private _printingService: PrintingServiceService
    ){
      this.searchForm = this._formBuilder.group({
        carTypeId: '',
        selectedYear: '',
        selectedNumber: '', 
      });
    }

  ngOnInit(): void {
    
    this.getExecutedPlatesList();
    this.generateYears();
    this.generateNumbers();

    this._plateService.getCarTypes().subscribe((data) => {
      this.carTypes = data;
    });
  
    
  }
  
  generateYears(){
    const currentYear = new Date().getFullYear();
    for (let year = 1980; year <= currentYear ; year++) {
      this.years.push(year);
    }
  }

  generateNumbers(){
    for (let num = 1; num <= 10; num++) {
      this.numbers.push(num);
    }
  }
  
  openAddEditExecutedPlateForm(data: any){
    if(data){
      const dialogRef = this._dialog.open(ExecutedPlatesAddEditComponent, {
        data: data
      });
      dialogRef.afterClosed().subscribe(result => {
        this.getExecutedPlatesList();
      });
    }
    else{
      const dialogRef = this._dialog.open(ExecutedPlatesAddEditComponent);
      dialogRef.afterClosed().subscribe(result => {
        this.getExecutedPlatesList();
      });
    }
  }

  getExecutedPlatesList() {
    this._plateService.getExecutedPlatesList().subscribe({
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
      this._plateService.getExecutedPlatesList(this.searchForm.value).subscribe({
        next: (res) => {
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;

          if (res.length > 0) {
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

  deleteExecutedPlate(id: number){
    this._plateService.deleteExecutedPlate(id).subscribe({
      next: (res) =>{
        alert("تم الحذف بنجاح يا معلم..");
        this.getExecutedPlatesList();
      }
    });
  }

  print(idDivToBePrint: string): void{
    this._printingService.printDivContent(idDivToBePrint);
  }
}
