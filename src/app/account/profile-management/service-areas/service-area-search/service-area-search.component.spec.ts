import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceAreaSearchComponent } from './service-area-search.component';

describe('ServiceAreaSearchComponent', () => {
  let component: ServiceAreaSearchComponent;
  let fixture: ComponentFixture<ServiceAreaSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceAreaSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceAreaSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
