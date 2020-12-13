import { TestBed } from '@angular/core/testing';

import { JtwTokenInterceptorService } from './jtw-token-interceptor.service';

describe('JtwTokenInterceptorService', () => {
  let service: JtwTokenInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JtwTokenInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
