import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoolSpaComponent } from './pool-spa.component';

describe('PoolSpaComponent', () => {
  let component: PoolSpaComponent;
  let fixture: ComponentFixture<PoolSpaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoolSpaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoolSpaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
