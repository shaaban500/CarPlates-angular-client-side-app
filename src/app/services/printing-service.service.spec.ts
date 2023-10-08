import { TestBed } from '@angular/core/testing';

import { PrintingServiceService } from './printing-service.service';

describe('PrintingServiceService', () => {
  let service: PrintingServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrintingServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
