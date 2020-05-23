import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormElectricalComponent } from './form-electrical.component';

describe('FormElectricalComponent', () => {
  let component: FormElectricalComponent;
  let fixture: ComponentFixture<FormElectricalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormElectricalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormElectricalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
