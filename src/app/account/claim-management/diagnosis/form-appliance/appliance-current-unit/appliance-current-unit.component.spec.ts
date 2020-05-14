import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplianceCurrentUnitComponent } from './appliance-current-unit.component';

describe('ApplianceCurrentUnitComponent', () => {
  let component: ApplianceCurrentUnitComponent;
  let fixture: ComponentFixture<ApplianceCurrentUnitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplianceCurrentUnitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplianceCurrentUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
