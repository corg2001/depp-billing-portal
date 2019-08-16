import { TestBed } from '@angular/core/testing';

import { ClaimFactoryService } from './claim.factory.service';

describe('Claim.FactoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClaimFactoryService = TestBed.get(ClaimFactoryService);
    expect(service).toBeTruthy();
  });
});
