import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutedPlatesComponent } from './executed-plates.component';

describe('ExecutedPlatesComponent', () => {
  let component: ExecutedPlatesComponent;
  let fixture: ComponentFixture<ExecutedPlatesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExecutedPlatesComponent]
    });
    fixture = TestBed.createComponent(ExecutedPlatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
