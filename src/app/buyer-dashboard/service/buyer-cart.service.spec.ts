import { TestBed } from '@angular/core/testing';

import { BuyerCartService } from './buyer-cart.service';

describe('BuyerCartService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BuyerCartService = TestBed.get(BuyerCartService);
    expect(service).toBeTruthy();
  });
});
