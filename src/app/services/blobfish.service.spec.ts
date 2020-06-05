import { TestBed } from '@angular/core/testing';

import { BlobfishService } from './blobfish.service';

describe('BlobfishService', () => {
  let service: BlobfishService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlobfishService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
