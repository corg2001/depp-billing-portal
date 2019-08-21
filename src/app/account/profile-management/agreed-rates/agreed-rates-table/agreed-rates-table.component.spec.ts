import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgreedRatesTableComponent } from './agreed-rates-table.component';

describe('AgreedRatesTableComponent', () => {
  let component: AgreedRatesTableComponent;
  let fixture: ComponentFixture<AgreedRatesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgreedRatesTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgreedRatesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
