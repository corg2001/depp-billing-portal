import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseDiagnosisFormComponent } from './base-diagnosis-form.component';

describe('BaseDiagnosisFormComponent', () => {
  let component: BaseDiagnosisFormComponent;
  let fixture: ComponentFixture<BaseDiagnosisFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseDiagnosisFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseDiagnosisFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
