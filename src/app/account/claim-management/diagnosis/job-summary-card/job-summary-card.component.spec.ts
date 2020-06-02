import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobSummaryCardComponent } from './job-summary-card.component';

describe('JobSummaryCardComponent', () => {
  let component: JobSummaryCardComponent;
  let fixture: ComponentFixture<JobSummaryCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobSummaryCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobSummaryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
