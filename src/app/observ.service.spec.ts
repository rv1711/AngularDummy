import { TestBed } from '@angular/core/testing';

import { ObservService } from './observ.service';

describe('ObservService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ObservService = TestBed.get(ObservService);
    expect(service).toBeTruthy();
  });
});
