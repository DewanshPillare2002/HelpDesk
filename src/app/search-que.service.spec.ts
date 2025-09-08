import { TestBed } from '@angular/core/testing';

import { SearchQueService } from './search-que.service';

describe('SearchQueService', () => {
  let service: SearchQueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchQueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
