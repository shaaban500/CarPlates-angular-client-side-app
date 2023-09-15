import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlateAddEditComponent } from './plate-add-edit.component';

describe('PlateAddEditComponent', () => {
  let component: PlateAddEditComponent;
  let fixture: ComponentFixture<PlateAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlateAddEditComponent]
    });
    fixture = TestBed.createComponent(PlateAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
