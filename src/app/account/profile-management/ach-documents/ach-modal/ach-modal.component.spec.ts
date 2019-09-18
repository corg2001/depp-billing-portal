import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AchModalComponent } from './ach-modal.component';

describe('AchUploadDocsComponent', () => {
  let component: AchModalComponent;
  let fixture: ComponentFixture<AchModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AchModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AchModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
