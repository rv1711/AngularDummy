import { TestBed } from '@angular/core/testing';

import { SellerHeaderService } from './seller-header.service';

describe('SellerHeaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SellerHeaderService = TestBed.get(SellerHeaderService);
    expect(service).toBeTruthy();
  });
});
