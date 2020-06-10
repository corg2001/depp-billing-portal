import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostFlatRateComponent } from './cost-flat-rate.component';

describe('CostFlatRateComponent', () => {
  let component: CostFlatRateComponent;
  let fixture: ComponentFixture<CostFlatRateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostFlatRateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostFlatRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
