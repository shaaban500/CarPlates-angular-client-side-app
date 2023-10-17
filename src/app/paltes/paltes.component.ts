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