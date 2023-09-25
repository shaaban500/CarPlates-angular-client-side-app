import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutedPlatesAddEditComponent } from './executed-plates-add-edit.component';

describe('ExecutedPlatesAddEditComponent', () => {
  let component: ExecutedPlatesAddEditComponent;
  let fixture: ComponentFixture<ExecutedPlatesAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExecutedPlatesAddEditComponent]
    });
    fixture = TestBed.createComponent(ExecutedPlatesAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
