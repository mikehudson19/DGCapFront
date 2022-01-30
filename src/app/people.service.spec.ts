import { TestBed } from '@angular/core/testing';

import { PeopleService } from './mock-person.service';

describe('PeopleService', () => {
  let service: PeopleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeopleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
