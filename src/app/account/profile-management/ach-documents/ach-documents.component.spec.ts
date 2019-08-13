import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AchDocumentsComponent } from './ach-documents.component';

describe('AchDocumentsComponent', () => {
  let component: AchDocumentsComponent;
  let fixture: ComponentFixture<AchDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AchDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AchDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
