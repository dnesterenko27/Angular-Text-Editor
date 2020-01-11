import { TestBed } from '@angular/core/testing';

import { SynonymService } from './synonym.service';

describe('SynonymService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SynonymService = TestBed.get(SynonymService);
    expect(service).toBeTruthy();
  });
});
