import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormHvacComponent } from './form-hvac.component';

describe('FormHvacComponent', () => {
  let component: FormHvacComponent;
  let fixture: ComponentFixture<FormHvacComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormHvacComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormHvacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
