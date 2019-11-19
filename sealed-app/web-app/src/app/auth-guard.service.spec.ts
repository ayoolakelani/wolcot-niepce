import { AuthGuard } from 'src/app/auth-guard.service';
import { TestBed } from '@angular/core/testing';


describe('AuthGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthGuard = TestBed.get(AuthGuard);
    expect(service).toBeTruthy();
  });
});
