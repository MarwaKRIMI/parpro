import { TestBed, inject } from '@angular/core/testing';

import { PreviousRouterService } from './previous-router.service';

describe('PreviousRouterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PreviousRouterService]
    });
  });

  it('should be created', inject([PreviousRouterService], (service: PreviousRouterService) => {
    expect(service).toBeTruthy();
  }));
});
