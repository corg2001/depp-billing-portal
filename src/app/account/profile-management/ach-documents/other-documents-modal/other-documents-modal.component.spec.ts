import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherDocumentsModalComponent } from './other-documents-modal.component';

describe('OtherDocumentsModalComponent', () => {
  let component: OtherDocumentsModalComponent;
  let fixture: ComponentFixture<OtherDocumentsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherDocumentsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherDocumentsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
