import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceTestComponent } from './invoice-test.component';

describe('InvoiceTestComponent', () => {
  let component: InvoiceTestComponent;
  let fixture: ComponentFixture<InvoiceTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
