import { TestBed } from '@angular/core/testing';
import { AgreedRatesService } from './agreed-rates.service';

describe('AgreedRatesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AgreedRatesService = TestBed.get(AgreedRatesService);
    expect(service).toBeTruthy();
  });
});
