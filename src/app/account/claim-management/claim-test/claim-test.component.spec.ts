import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimTestComponent } from './claim-test.component';

describe('ClaimTestComponent', () => {
  let component: ClaimTestComponent;
  let fixture: ComponentFixture<ClaimTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
