import { TestBed } from '@angular/core/testing';
import { WillService } from './will.service';



describe('WillService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WillService = TestBed.get(WillService);
    expect(service).toBeTruthy();
  });
});
