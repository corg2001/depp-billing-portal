import { TestBed } from '@angular/core/testing';

import { ServiceAreasService } from './service-areas.service';

describe('ServiceAreasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServiceAreasService = TestBed.get(ServiceAreasService);
    expect(service).toBeTruthy();
  });
});
