import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlumbingGarbageDisposalComponent } from './plumbing-garbage-disposal.component';

describe('PlumbingGarbageDisposalComponent', () => {
  let component: PlumbingGarbageDisposalComponent;
  let fixture: ComponentFixture<PlumbingGarbageDisposalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlumbingGarbageDisposalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlumbingGarbageDisposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
