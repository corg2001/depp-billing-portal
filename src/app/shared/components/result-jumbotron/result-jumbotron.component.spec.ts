import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultJumbotronComponent } from './result-jumbotron.component';

describe('ResulJumbotronComponent', () => {
  let component: ResultJumbotronComponent;
  let fixture: ComponentFixture<ResultJumbotronComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultJumbotronComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultJumbotronComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
