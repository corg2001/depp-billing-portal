import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HvacCurrentUnitComponent } from './hvac-current-unit.component';

describe('HvacCurrentUnitComponent', () => {
  let component: HvacCurrentUnitComponent;
  let fixture: ComponentFixture<HvacCurrentUnitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HvacCurrentUnitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HvacCurrentUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
