import { TestBed } from '@angular/core/testing';

import { ServiceAreasFactoryAbstractService } from './service-areas.factory.abstract.service';

describe('ServiceAreasFactoryAbstractService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServiceAreasFactoryAbstractService = TestBed.get(ServiceAreasFactoryAbstractService);
    expect(service).toBeTruthy();
  });
});
