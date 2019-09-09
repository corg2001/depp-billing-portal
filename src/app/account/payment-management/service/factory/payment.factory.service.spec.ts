import { TestBed } from '@angular/core/testing';

import { PaymentFactoryService } from './payment.factory.service';

describe('PaymentFactoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PaymentFactoryService = TestBed.get(PaymentFactoryService);
    expect(service).toBeTruthy();
  });
});
