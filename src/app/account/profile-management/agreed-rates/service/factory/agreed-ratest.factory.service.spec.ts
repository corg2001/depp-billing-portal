import { TestBed } from '@angular/core/testing';

import { AgreedRatestFactoryService } from './agreed-ratest.factory.service';

describe('AgreedRatestFactoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AgreedRatestFactoryService = TestBed.get(AgreedRatestFactoryService);
    expect(service).toBeTruthy();
  });
});
