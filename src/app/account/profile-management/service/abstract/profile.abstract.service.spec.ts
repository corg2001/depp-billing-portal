import { TestBed } from '@angular/core/testing';

import { ProfileAbstractService } from './profile.abstract.service';

describe('ProfileAbstractService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProfileAbstractService = TestBed.get(ProfileAbstractService);
    expect(service).toBeTruthy();
  });
});
