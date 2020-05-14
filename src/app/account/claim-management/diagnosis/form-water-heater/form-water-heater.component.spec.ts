import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormWaterHeaterComponent } from './form-water-heater.component';

describe('FormWaterHeaterComponent', () => {
  let component: FormWaterHeaterComponent;
  let fixture: ComponentFixture<FormWaterHeaterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormWaterHeaterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormWaterHeaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
