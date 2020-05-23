import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplianceCooktopComponent } from './appliance-cooktop.component';

describe('ApplianceCooktopComponent', () => {
  let component: ApplianceCooktopComponent;
  let fixture: ComponentFixture<ApplianceCooktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplianceCooktopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplianceCooktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
