import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PlateAddEditComponent } from '../plate-add-edit/plate-add-edit.component';
import { PlateService } from '../services/plate.service';
import {Component, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PrintingServiceService } from '../services/printing-service.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-paltes',
  templateUrl: './paltes.component.html',
  styleUrls: ['./paltes.component.scss']
})
export class PaltesComponent implements OnInit {
  
  plates: any[] = [];
  carTypes: any[] = [];
  carStates: any[] = [];
  selectedCarType: string = '';
  selectedCarState: string = '';
  
  filterObj = {
    pageIndex: 1,
    pageSize: 10,
    carTypeId: null,
    carStateId: null,
    letters: null,
    numbers: null,
    ownerName: null,
    ownerPhone: null,
    ownerNationalId: null,
    executionYear: null,
    executionNumber: null,
    date: null,
  };
  

  constructor(
    private _dialog: MatDialog,
    private _plateService: PlateService,
    private _printingService: PrintingServiceService,
    ){};

  ngOnInit(): void {
  
    this.getPlates();
    
    this._plateService.getCarTypes().subscribe((data) => {
      this.carTypes = data;
    });
    
    this._plateService.getCarStates().subscribe((data) => {
      this.carStates = data;
    });
  }
  
  getPlates() {
    this._plateService.getPlatesList(this.filterObj).subscribe({
      next: (res) => {
        this.plates = res; 
      },
      error: console.log,
    });
  }
  
  onPrevious(){
    this.filterObj.pageIndex --;

    if(this.filterObj.pageIndex < 1){
      this.filterObj.pageIndex = 1;
    }

    this.getPlates();
  }
  
  onNext(){
    this.filterObj.pageIndex ++;
    this.getPlates();
  }
  
  openAddEditPlateForm(data:any){
    if(data){
      const dialogRef = this._dialog.open(PlateAddEditComponent, {
        data: data
      });
      dialogRef.afterClosed().subscribe(result => {
        this.getPlates();
      });
    }
    else{
      const dialogRef = this._dialog.open(PlateAddEditComponent);
      dialogRef.afterClosed().subscribe(result => {
        this.getPlates();
      });
    }
  }
  

  deletePlate(id: number){
    this._plateService.deletePlate(id).subscribe({
      next: (res) =>{
        alert("تم الحذف بنجاح يا معلم..");
        this.getPlates();
      }
    });
  }

  print(idDivToBePrint: string): void{
    this._printingService.printDivContent(idDivToBePrint);
  }

  updateCarType() : void{
    const carTypeId = +this.filterObj.carTypeId!; // Using ! to assert that it's not null
    const filteredType = this.carTypes.find(type => type.id === carTypeId);
    if (filteredType) {
      this.selectedCarType = filteredType.type;
    } else {
      this.selectedCarType = ''; // Handle if no item is selected
    }
  }
  

  updateCarState(): void {
    const carStateId = +this.filterObj.carStateId!; // Using ! to assert that it's not null
    const filteredState = this.carStates.find(state => state.id === carStateId);
    if (filteredState) {
      this.selectedCarState = filteredState.state;
    } else {
      this.selectedCarState = ''; // Handle if no item is selected
    }
  }

  columnClasses: { [key: string]: boolean } = {};

  // Method to toggle the .no-print class for a specific column
  toggleNoPrintClass(columnName: string) {
    this.columnClasses[columnName] = !this.columnClasses[columnName];
  }

  // Method to check if the .no-print class is enabled for a specific column
  isNoPrintClassEnabled(columnName: string): boolean {
    return this.columnClasses[columnName];
  }
  
}

/*export class PaltesComponent implements OnInit {
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
    private _formBuilder: FormBuilder,
    private _printingService: PrintingServiceService,
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
*/