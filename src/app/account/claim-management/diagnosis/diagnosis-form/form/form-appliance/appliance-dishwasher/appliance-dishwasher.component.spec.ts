import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplianceDishwasherComponent } from './appliance-dishwasher.component';

describe('ApplianceDishwasherComponent', () => {
  let component: ApplianceDishwasherComponent;
  let fixture: ComponentFixture<ApplianceDishwasherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplianceDishwasherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplianceDishwasherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
