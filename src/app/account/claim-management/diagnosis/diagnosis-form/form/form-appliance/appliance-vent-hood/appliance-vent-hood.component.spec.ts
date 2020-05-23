import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplianceVentHoodComponent } from './appliance-vent-hood.component';

describe('ApplianceVentHoodComponent', () => {
  let component: ApplianceVentHoodComponent;
  let fixture: ComponentFixture<ApplianceVentHoodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplianceVentHoodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplianceVentHoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
