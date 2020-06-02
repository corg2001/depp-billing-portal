import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplianceWasherComponent } from './appliance-washer.component';

describe('ApplianceWasherComponent', () => {
  let component: ApplianceWasherComponent;
  let fixture: ComponentFixture<ApplianceWasherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplianceWasherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplianceWasherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
