import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceAreaTableComponent } from './service-area-table.component';

describe('ServiceAreaTableComponent', () => {
  let component: ServiceAreaTableComponent;
  let fixture: ComponentFixture<ServiceAreaTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceAreaTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceAreaTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
