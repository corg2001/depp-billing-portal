import { TestBed } from '@angular/core/testing';

import { CalendarAbstractService } from './calendar.abstract.service';

describe('CalendarAbstractService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CalendarAbstractService = TestBed.get(CalendarAbstractService);
    expect(service).toBeTruthy();
  });
});
