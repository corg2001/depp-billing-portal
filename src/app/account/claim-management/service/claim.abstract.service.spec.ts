import { TestBed } from '@angular/core/testing';

import { ClaimServiceAbstract } from './claim.abstract.service';

describe('ClaimAbstractService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClaimServiceAbstract = TestBed.get(ClaimServiceAbstract);
    expect(service).toBeTruthy();
  });
});
