import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplianceRefrigeratorComponent } from './appliance-refrigerator.component';

describe('ApplianceRefrigeratorComponent', () => {
  let component: ApplianceRefrigeratorComponent;
  let fixture: ComponentFixture<ApplianceRefrigeratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplianceRefrigeratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplianceRefrigeratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
