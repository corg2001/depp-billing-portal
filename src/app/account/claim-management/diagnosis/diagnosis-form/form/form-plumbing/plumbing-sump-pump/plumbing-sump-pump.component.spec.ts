import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlumbingSumpPumpComponent } from './plumbing-sump-pump.component';

describe('PlumbingSumpPumpComponent', () => {
  let component: PlumbingSumpPumpComponent;
  let fixture: ComponentFixture<PlumbingSumpPumpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlumbingSumpPumpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlumbingSumpPumpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
