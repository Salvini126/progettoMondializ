import { TestBed } from '@angular/core/testing';

import { StatoMondialiService } from './stato-mondiali.service';

describe('StatoMondialiService', () => {
  let service: StatoMondialiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatoMondialiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
