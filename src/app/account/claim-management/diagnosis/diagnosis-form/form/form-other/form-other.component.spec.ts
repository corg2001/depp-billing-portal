import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormOtherComponent } from './form-other.component';

describe('FormOtherComponent', () => {
  let component: FormOtherComponent;
  let fixture: ComponentFixture<FormOtherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormOtherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormOtherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
