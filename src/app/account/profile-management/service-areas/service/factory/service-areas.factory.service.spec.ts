import { TestBed } from '@angular/core/testing';

import { ServiceAreasFactoryService } from './service-areas.factory.service';

describe('ServiceAreasFactoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServiceAreasFactoryService = TestBed.get(ServiceAreasFactoryService);
    expect(service).toBeTruthy();
  });
});
