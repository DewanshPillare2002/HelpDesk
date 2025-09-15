import { TestBed } from '@angular/core/testing';

import { PayementDataService } from './payement-data.service';

describe('PayementDataService', () => {
  let service: PayementDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PayementDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
