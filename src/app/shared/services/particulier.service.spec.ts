import { TestBed, inject } from '@angular/core/testing';

import { ParticulierService } from './particulier.service';

describe('ParticulierService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParticulierService]
    });
  });

  it('should be created', inject([ParticulierService], (service: ParticulierService) => {
    expect(service).toBeTruthy();
  }));
});
