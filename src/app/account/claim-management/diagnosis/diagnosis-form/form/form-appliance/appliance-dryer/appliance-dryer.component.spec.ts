import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplianceDryerComponent } from './appliance-dryer.component';

describe('ApplianceDryerComponent', () => {
  let component: ApplianceDryerComponent;
  let fixture: ComponentFixture<ApplianceDryerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplianceDryerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplianceDryerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
