import { TestBed } from '@angular/core/testing';

import { ShareData1Service } from './share-data1.service';

describe('ShareData1Service', () => {
  let service: ShareData1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShareData1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
