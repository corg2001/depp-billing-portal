import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplianceMicrowaveComponent } from './appliance-microwave.component';

describe('ApplianceMicrowaveComponent', () => {
  let component: ApplianceMicrowaveComponent;
  let fixture: ComponentFixture<ApplianceMicrowaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplianceMicrowaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplianceMicrowaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
