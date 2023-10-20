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
  
  years: any[] = [];
  numbers: any[] = [];
  carTypes: any[] = [];
  executedPlates: any[] = [];
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
    private _printingService: PrintingServiceService
    ){ }


  ngOnInit(): void {
    
    this.getExecutedPlates();
    this.generateYears();
    this.generateNumbers();

    this._plateService.getCarTypes().subscribe((data) => {
      this.carTypes = data;
    });
  
    this._plateService.getExecutedCarStates().subscribe((data) => {
      this.carStates = data;
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
  
  onPrevious(){
    this.filterObj.pageIndex --;

    if(this.filterObj.pageIndex < 1){
      this.filterObj.pageIndex = 1;
    }

    this.getExecutedPlates();
  }
  
  onNext(){
    this.filterObj.pageIndex ++;
    this.getExecutedPlates();
  }

  getExecutedPlates() {
    this._plateService.getExecutedPlatesList(this.filterObj).subscribe({
      next: (res) => {
        this.executedPlates = res;
      },
      error: console.log,
    });
  }

  openAddEditExecutedPlateForm(data: any){
    if(data){
      const dialogRef = this._dialog.open(ExecutedPlatesAddEditComponent, {
        data: data
      });
      dialogRef.afterClosed().subscribe(result => {
        this.getExecutedPlates();
      });
    }
    else{
      const dialogRef = this._dialog.open(ExecutedPlatesAddEditComponent);
      dialogRef.afterClosed().subscribe(result => {
        this.getExecutedPlates();
      });
    }
  }


  deleteExecutedPlate(id: number){
    this._plateService.deleteExecutedPlate(id).subscribe({
      next: (res) =>{
        alert("تم الحذف بنجاح يا معلم..");
        this.getExecutedPlates();
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

}
