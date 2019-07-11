import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileTestComponent } from './profile-test.component';

describe('ProfileTestComponent', () => {
  let component: ProfileTestComponent;
  let fixture: ComponentFixture<ProfileTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
