import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlumbingStoppageClogComponent } from './plumbing-stoppage-clog.component';

describe('PlumbingStoppageClogComponent', () => {
  let component: PlumbingStoppageClogComponent;
  let fixture: ComponentFixture<PlumbingStoppageClogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlumbingStoppageClogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlumbingStoppageClogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
