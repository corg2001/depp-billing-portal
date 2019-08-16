import { TestBed } from '@angular/core/testing';

import { ClaimFactoryServiceAbstract  } from './claim.factory.abstract.service';

describe('ClaimFactoryAbstractService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClaimFactoryServiceAbstract = TestBed.get(ClaimFactoryServiceAbstract);
    expect(service).toBeTruthy();
  });
});
