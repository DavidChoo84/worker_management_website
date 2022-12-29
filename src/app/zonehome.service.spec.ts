import { TestBed } from '@angular/core/testing';

import { ZonehomeService } from './zonehome.service';

describe('ZonehomeService', () => {
  let service: ZonehomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZonehomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
