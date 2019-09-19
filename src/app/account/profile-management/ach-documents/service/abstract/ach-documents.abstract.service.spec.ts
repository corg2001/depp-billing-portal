import { TestBed } from '@angular/core/testing';

import { AchDocumentsAbstractService } from './ach-documents.abstract.service';

describe('AchDocumentsAbstractService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AchDocumentsAbstractService = TestBed.get(AchDocumentsAbstractService);
    expect(service).toBeTruthy();
  });
});
