import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplianceWallOvenComponent } from './appliance-wall-oven.component';

describe('ApplianceWallOvenComponent', () => {
  let component: ApplianceWallOvenComponent;
  let fixture: ComponentFixture<ApplianceWallOvenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplianceWallOvenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplianceWallOvenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
