import { TestBed } from '@angular/core/testing';

import { InvoiceFactoryAbstractService } from './invoice.factory.abstract.service';

describe('ServiceFactoryAbstractService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InvoiceFactoryAbstractService = TestBed.get(InvoiceFactoryAbstractService);
    expect(service).toBeTruthy();
  });
});
