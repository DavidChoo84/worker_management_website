import { TestBed } from '@angular/core/testing';

import { ZonecrudService } from './zonecrud.service';

describe('ZonecrudService', () => {
  let service: ZonecrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZonecrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
