import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalenderInfoComponent } from './calender-info.component';

describe('CalenderInfoComponent', () => {
  let component: CalenderInfoComponent;
  let fixture: ComponentFixture<CalenderInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalenderInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalenderInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
