import { TestBed } from '@angular/core/testing';

import { HelpAbstractService } from './help-abstract.service';

describe('HelpAbstractService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HelpAbstractService = TestBed.get(HelpAbstractService);
    expect(service).toBeTruthy();
  });
});
