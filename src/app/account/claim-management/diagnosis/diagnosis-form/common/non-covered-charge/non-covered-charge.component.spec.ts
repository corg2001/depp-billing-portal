import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonCoveredChargeComponent } from './non-covered-charge.component';

describe('NonCoveredChargeComponent', () => {
  let component: NonCoveredChargeComponent;
  let fixture: ComponentFixture<NonCoveredChargeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonCoveredChargeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonCoveredChargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
