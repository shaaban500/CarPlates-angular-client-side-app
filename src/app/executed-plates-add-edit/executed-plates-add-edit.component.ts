import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PlateService } from '../services/plate.service';
import { DialogRef } from '@angular/cdk/dialog';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-executed-plates-add-edit',
  templateUrl: './executed-plates-add-edit.component.html',
  styleUrls: ['./executed-plates-add-edit.component.scss']
})
export class ExecutedPlatesAddEditComponent implements OnInit {
  plateForm: FormGroup;
  carTypes: any[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private _plateService: PlateService,
    private _dialogref: DialogRef<ExecutedPlatesAddEditComponent>
    ) {

      this.plateForm = this._formBuilder.group({
        id: '',
        carTypeId: '',
        letters: '',
        numbers: '',
        date: '',
        executionYear: '',
        executionNumber: '',
      });

    }
    
    ngOnInit(): void {
      this._plateService.getCarTypes().subscribe((data) => {
        this.carTypes = data;
      });

    }




  onFormSubmit() {
    if (this.plateForm.valid) {
      this._plateService.addExecutedPlate(this.plateForm.value).subscribe({
        next: (val: any) => {
          this._dialogref.close();
          alert('7a7aaaaaaaaaaaa');
        }
      });
    }
  }
}
