import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgreedRateDetailComponent } from './agreed-rate-detail.component';

describe('AgreedRateDetailComponent', () => {
  let component: AgreedRateDetailComponent;
  let fixture: ComponentFixture<AgreedRateDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgreedRateDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgreedRateDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
