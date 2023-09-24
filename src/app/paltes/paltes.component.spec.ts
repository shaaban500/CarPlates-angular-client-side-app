import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaltesComponent } from './paltes.component';

describe('PaltesComponent', () => {
  let component: PaltesComponent;
  let fixture: ComponentFixture<PaltesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaltesComponent]
    });
    fixture = TestBed.createComponent(PaltesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
