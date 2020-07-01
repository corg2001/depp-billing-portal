import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalCommentsComponent } from './additional-comments.component';

describe('AdditionalCommentsComponent', () => {
  let component: AdditionalCommentsComponent;
  let fixture: ComponentFixture<AdditionalCommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdditionalCommentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
