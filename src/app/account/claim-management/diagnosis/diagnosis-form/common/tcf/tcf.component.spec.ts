import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TcfComponent } from './tcf.component';

describe('TcfComponent', () => {
  let component: TcfComponent;
  let fixture: ComponentFixture<TcfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TcfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TcfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
