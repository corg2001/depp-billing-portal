import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplianceOtherComponent } from './appliance-other.component';

describe('ApplianceOtherComponent', () => {
  let component: ApplianceOtherComponent;
  let fixture: ComponentFixture<ApplianceOtherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplianceOtherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplianceOtherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
