import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PlateAddEditComponent } from './plate-add-edit/plate-add-edit.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'crud-app';

  constructor(private _dialog: MatDialog){}

  openAddEditPlateForm(){
    this._dialog.open(PlateAddEditComponent);
  }
}
