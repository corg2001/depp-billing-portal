import { TestBed } from '@angular/core/testing';

import { ProfileFactoryService } from './profile.factory.service';

describe('ProfileFactoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProfileFactoryService = TestBed.get(ProfileFactoryService);
    expect(service).toBeTruthy();
  });
});
