import { TestBed } from '@angular/core/testing';

import { AssignedPartService } from './assigned-part.service';

describe('AssignedPartService', () => {
  let service: AssignedPartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssignedPartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
