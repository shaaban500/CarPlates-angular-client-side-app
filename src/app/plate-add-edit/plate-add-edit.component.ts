import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PlateService } from '../services/plate.service';
import { DialogRef } from '@angular/cdk/dialog';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-plate-add-edit',
  templateUrl: './plate-add-edit.component.html',
  styleUrls: ['./plate-add-edit.component.scss']
})

export class PlateAddEditComponent implements OnInit {
  plateForm: FormGroup;
  carTypes: any[] = [];
  carStates: any[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private _plateService: PlateService,
    private _dialogref: DialogRef<PlateAddEditComponent>
    ) {

      this.plateForm = this._formBuilder.group({
        id: Number,
        carTypeId: Number,
        carStateId: Number,
        letters: '',
        numbers: '',
        date: Date,
        ownerName: '',
        ownerAdress: '',
        ownerPhone: '',
        ownerNationalId: '',
      });

    }
    
    ngOnInit(): void {
      this._plateService.getCarTypes().subscribe((data) => {
        this.carTypes = data;
      });

      this._plateService.getCarStates().subscribe((data) => {
        this.carStates = data;
      });
    }




  onFormSubmit() {
    if (this.plateForm.valid) {
      this._plateService.addPlate(this.plateForm.value).subscribe({
        next: (val: any) => {
          this._dialogref.close();
          alert('');
        },
        error: (err: any) => {
          console.error(err);
        }
      });
    }
  }
}
 