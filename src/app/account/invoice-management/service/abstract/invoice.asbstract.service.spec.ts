import { TestBed } from '@angular/core/testing';

import { InvoiceAsbstractService } from './invoice.asbstract.service';

describe('InvoiceAsbstractService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InvoiceAsbstractService = TestBed.get(InvoiceAsbstractService);
    expect(service).toBeTruthy();
  });
});
