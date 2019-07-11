import { TestBed } from '@angular/core/testing';

import { AuthtenticationService } from './authtentication.service';

describe('AuthtenticationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthtenticationService = TestBed.get(AuthtenticationService);
    expect(service).toBeTruthy();
  });
});
