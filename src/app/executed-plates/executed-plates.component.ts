import { MatDialog } from '@angular/material/dialog';
import { PlateService } from '../services/plate.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExecutedPlatesAddEditComponent } from '../executed-plates-add-edit/executed-plates-add-edit.component';

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
    private _formBuilder: FormBuilder
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
  
  openAddEditExecutedPlateForm(){
    this._dialog.open(ExecutedPlatesAddEditComponent);
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

  printDivContent(): void {
    var printContent = document.getElementById("printContent");
    
    if (!printContent) {
      console.error("Element with id 'printContent' not found.");
      return;
    }
    
    var printWindow = window.open("", "_blank");
    printWindow?.document.write("<html dir='rtl'><head>");
    
    
    printWindow?.document.write('<style>');
    printWindow?.document.write(` 
    table {
      border-collapse: collapse; 
      overflow: hidden; 
      border-spacing: 0;
      width: 100%;
      box-shadow: var(--shadow-1);
      dir: ltr;
  }
  
  th, td {
      text-align: center;
      padding: 10px 10px;
      min-height: 50px;
      font-size: 1.5rem;
      background-color: var(--color-white);
      border: 1px solid gray;
  }
  
  thead, th {
      min-height: 50px;
      font-size: 1.5rem;
      font-weight: normal;
      color: var(--color-primary);
      background-color: var(--color-light);
  }
  
  
  td .div, .td span {
      font-size: 1.5rem;
  }

  .no-print{
    display: none !important;
  }
    `);
    printWindow?.document.write('</style>');
    
    printWindow?.document.write("</head><body><main>");
    printWindow?.document.write(printContent?.innerHTML);
    printWindow?.document.write("</main></body></html>");
    
    printWindow?.document.close();
    printWindow?.print();
  }


  async printLargeDataConcurrently(): Promise<void> {
    // Define the chunk size based on your needs
    const chunkSize = 100; // You can adjust this value
  
    try {
      const data = await this._plateService.getExecutedPlatesList().toPromise();
      if (!data || data.length === 0) {
        console.error("No data to print.");
        return;
      }
  
      for (let i = 0; i < data.length; i += chunkSize) {
        const chunk = data.slice(i, i + chunkSize);
  
        await new Promise<void>((resolve) => {
          setTimeout(() => {
            const printWindow = window.open("", "_blank");
  
            if (!printWindow) {
              console.error("Unable to open a new window for printing.");
              resolve();
              return;
            }
  
            const printDocument = printWindow.document;
  
            if (!printDocument) {
              console.error("Unable to access the print document.");
              resolve();
              return;
            }
  
            printDocument.write("<html><head><title>Print</title></head><body>");
            printDocument.write("<main>");
  
            // Process and print the chunk of data here
            chunk.forEach((item: string) => {
              printDocument.write(`<div>${item}</div>`);
            });
  
            printDocument.write("</main></body></html>");
  
            printDocument.close();
  
            printWindow.addEventListener("afterprint", () => {
              printWindow.close();
              resolve();
            });
  
            printWindow.print();
          }, 100); // Adjust the delay (in milliseconds) between chunks
        });
      }
  
      console.log("Printing completed successfully.");
    } catch (error) {
      console.error("Error while printing:", error);
    }
  }

}
