import { TestBed, inject } from '@angular/core/testing';

import { ForkService } from './fork.service';

describe('ForkService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ForkService]
    });
  });

  it('should be created', inject([ForkService], (service: ForkService) => {
    expect(service).toBeTruthy();
  }));
});
