import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPlumbingComponent } from './form-plumbing.component';

describe('FormPlumbingComponent', () => {
  let component: FormPlumbingComponent;
  let fixture: ComponentFixture<FormPlumbingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormPlumbingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPlumbingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
