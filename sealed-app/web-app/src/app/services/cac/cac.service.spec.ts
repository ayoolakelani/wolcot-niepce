import { TestBed } from '@angular/core/testing';

import { CacService } from './cac.service';

describe('CacService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CacService = TestBed.get(CacService);
    expect(service).toBeTruthy();
  });
});
