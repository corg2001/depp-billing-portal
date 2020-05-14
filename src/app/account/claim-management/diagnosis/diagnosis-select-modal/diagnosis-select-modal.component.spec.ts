import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosisSelectModalComponent } from './diagnosis-select-modal.component';

describe('DiagnosisSelectModalComponent', () => {
  let component: DiagnosisSelectModalComponent;
  let fixture: ComponentFixture<DiagnosisSelectModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiagnosisSelectModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosisSelectModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
