import { TestBed } from '@angular/core/testing';

import { ProfileFactoryAbstractService } from './profile.factory.abstract.service';

describe('ProfileFactoryAbstractService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProfileFactoryAbstractService = TestBed.get(ProfileFactoryAbstractService);
    expect(service).toBeTruthy();
  });
});
