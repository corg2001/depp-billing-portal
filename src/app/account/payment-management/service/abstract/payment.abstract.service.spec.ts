import { TestBed } from '@angular/core/testing';

import { PaymentAbstractService } from './payment.abstract.service';

describe('PaymentAbstractService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PaymentAbstractService = TestBed.get(PaymentAbstractService);
    expect(service).toBeTruthy();
  });
});
