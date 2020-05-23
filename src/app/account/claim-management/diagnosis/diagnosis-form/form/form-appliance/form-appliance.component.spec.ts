import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormApplianceComponent } from './form-appliance.component';

describe('FormApplianceComponent', () => {
  let component: FormApplianceComponent;
  let fixture: ComponentFixture<FormApplianceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormApplianceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormApplianceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
