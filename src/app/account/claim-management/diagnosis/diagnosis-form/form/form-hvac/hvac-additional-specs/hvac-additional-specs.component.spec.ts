import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HvacAdditionalSpecsComponent } from './hvac-additional-specs.component';

describe('HvacAdditionalSpecsComponent', () => {
  let component: HvacAdditionalSpecsComponent;
  let fixture: ComponentFixture<HvacAdditionalSpecsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HvacAdditionalSpecsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HvacAdditionalSpecsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
