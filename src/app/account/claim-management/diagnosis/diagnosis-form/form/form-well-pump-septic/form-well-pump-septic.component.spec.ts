import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormWellPumpSepticComponent } from './form-well-pump-septic.component';

describe('FormWellPumpSepticComponent', () => {
  let component: FormWellPumpSepticComponent;
  let fixture: ComponentFixture<FormWellPumpSepticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormWellPumpSepticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormWellPumpSepticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
