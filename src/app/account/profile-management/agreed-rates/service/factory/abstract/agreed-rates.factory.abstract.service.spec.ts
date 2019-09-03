import { TestBed } from '@angular/core/testing';

import { AgreedRatesFactoryAbstractService } from './agreed-rates.factory.abstract.service';

describe('AgreedRatesFactoryAbstractService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AgreedRatesFactoryAbstractService = TestBed.get(AgreedRatesFactoryAbstractService);
    expect(service).toBeTruthy();
  });
});
