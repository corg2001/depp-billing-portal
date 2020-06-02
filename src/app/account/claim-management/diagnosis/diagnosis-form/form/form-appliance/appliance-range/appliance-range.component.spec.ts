import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplianceRangeComponent } from './appliance-range.component';

describe('ApplianceRangeComponent', () => {
  let component: ApplianceRangeComponent;
  let fixture: ComponentFixture<ApplianceRangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplianceRangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplianceRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
