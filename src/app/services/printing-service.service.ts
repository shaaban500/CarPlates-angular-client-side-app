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
            min-height: 30px;
            font-size: 1rem;
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
        
        
        td, td .div, .td span {
            font-size: 1rem;
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
}
