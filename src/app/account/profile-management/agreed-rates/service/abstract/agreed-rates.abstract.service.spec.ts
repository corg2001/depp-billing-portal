import { TestBed } from '@angular/core/testing';

import { AgreedRatesAbstractService } from './agreed-rates.abstract.service';

describe('AgreedRatesAbstractService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AgreedRatesAbstractService = TestBed.get(AgreedRatesAbstractService);
    expect(service).toBeTruthy();
  });
});
