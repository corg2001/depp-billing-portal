import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgreedRatesComponent } from './agreed-rates.component';

describe('AgreedRatesComponent', () => {
  let component: AgreedRatesComponent;
  let fixture: ComponentFixture<AgreedRatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgreedRatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgreedRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
