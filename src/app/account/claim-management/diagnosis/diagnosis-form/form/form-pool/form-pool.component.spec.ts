import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPoolComponent } from './form-pool.component';

describe('FormPoolComponent', () => {
  let component: FormPoolComponent;
  let fixture: ComponentFixture<FormPoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormPoolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
