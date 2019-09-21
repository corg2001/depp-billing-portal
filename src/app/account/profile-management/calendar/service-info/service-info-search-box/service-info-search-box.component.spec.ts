import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceInfoSearchBoxComponent } from './service-info-search-box.component';

describe('SearchBoxComponent', () => {
  let component: ServiceInfoSearchBoxComponent;
  let fixture: ComponentFixture<ServiceInfoSearchBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceInfoSearchBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceInfoSearchBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
