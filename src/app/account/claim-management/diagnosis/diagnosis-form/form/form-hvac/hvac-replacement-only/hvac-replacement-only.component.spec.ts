import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HvacReplacementOnlyComponent } from './hvac-replacement-only.component';

describe('HvacReplacementOnlyComponent', () => {
  let component: HvacReplacementOnlyComponent;
  let fixture: ComponentFixture<HvacReplacementOnlyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HvacReplacementOnlyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HvacReplacementOnlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
