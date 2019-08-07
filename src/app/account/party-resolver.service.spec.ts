import { TestBed } from '@angular/core/testing';

import { PartyResolverService } from './party-resolver.service';

describe('PartyResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PartyResolverService = TestBed.get(PartyResolverService);
    expect(service).toBeTruthy();
  });
});
