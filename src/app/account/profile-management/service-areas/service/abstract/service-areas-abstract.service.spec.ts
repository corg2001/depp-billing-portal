import { TestBed } from '@angular/core/testing';

import { ServiceAreasAbstractService } from './service-areas-abstract.service';

describe('ServiceAreasAbstractService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServiceAreasAbstractService = TestBed.get(ServiceAreasAbstractService);
    expect(service).toBeTruthy();
  });
});
