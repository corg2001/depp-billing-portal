import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostTimeMaterialComponent } from './cost-time-material.component';

describe('CostTimeMaterialComponent', () => {
  let component: CostTimeMaterialComponent;
  let fixture: ComponentFixture<CostTimeMaterialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostTimeMaterialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostTimeMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
