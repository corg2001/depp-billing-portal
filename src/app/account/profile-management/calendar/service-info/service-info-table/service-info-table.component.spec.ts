import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceInfoTableComponent } from './service-info-table.component';

describe('TableComponent', () => {
  let component: ServiceInfoTableComponent;
  let fixture: ComponentFixture<ServiceInfoTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceInfoTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceInfoTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
