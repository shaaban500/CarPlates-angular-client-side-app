import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrintingServiceService {

  constructor() { }

  printDivContent(printContentId : string): void {
    var printContent = document.getElementById(printContentId);
    
    if (!printContent) {
      console.error("Element with id 'printContent' not found.");
      return;
    }
    
    var printWindow = window.open("", "_blank");
    printWindow?.document.write("<html dir='rtl'><head>");
    
    
    printWindow?.document.write('<style>');
    printWindow?.document.write(` 
    html{
      direction: rtl;
  }

  body {
      page-break-after: always; 
  }
   table {
      border-collapse: collapse; 
      overflow: hidden; 
      border-spacing: 0;
      width: 100%;
  }
  
  td {
    min-height: 20px;
  }
  
  th, td {
      text-align: center;
      padding: 10px 10px;
      border: 1px solid gray;
  }
  
  thead, th {
      font-size: 22px;
      font-weight: normal;
      background-color: #D3D3D3;
      min-height: 30px;
  }
  
  
  td{
      font-size: 18px;
  }

  .flex-column {
      display: flex;
      flex-direction: column;
  }

  .flex-row {
      display: flex;
      flex-direction: row;
  }


  .center {
      display: flex;
      justify-content: center;
      align-items: center;
  }

  .align-center {
      align-items: center;
  }

  
  .justify-content-between {
      justify-content: space-between;
  }

        .no-print{
          display: none !important;
        }

        .font20px{
          font-size: 22px;
        }

        .bold{
          font-weight: bold;
        }

        .mg-top20{
          margin-top: 20px;
        }
    `);
    printWindow?.document.write('</style>');
    
    printWindow?.document.write("</head><body><main>");
    printWindow?.document.write(printContent?.innerHTML);
    printWindow?.document.write("</main></body></html>");
    
    printWindow?.document.close();
    printWindow?.print();
  }
}
