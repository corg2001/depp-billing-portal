import { TestBed } from '@angular/core/testing';

import { InvoiceFactoryService } from './invoice.factory.service';

describe('InvoiceFactoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InvoiceFactoryService = TestBed.get(InvoiceFactoryService);
    expect(service).toBeTruthy();
  });
});
