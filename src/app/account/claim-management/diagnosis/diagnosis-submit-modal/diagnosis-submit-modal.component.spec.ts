import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosisSubmitModalComponent } from './diagnosis-submit-modal.component';

describe('DiagnosisSubmitModalComponent', () => {
  let component: DiagnosisSubmitModalComponent;
  let fixture: ComponentFixture<DiagnosisSubmitModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiagnosisSubmitModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosisSubmitModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
