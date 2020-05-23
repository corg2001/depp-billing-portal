import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartFailureComponent } from './part-failure.component';

describe('PartFailureComponent', () => {
  let component: PartFailureComponent;
  let fixture: ComponentFixture<PartFailureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartFailureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartFailureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
