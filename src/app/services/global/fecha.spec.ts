import { TestBed } from '@angular/core/testing';

import { FechaService } from './fecha';

describe('Fecha', () => {
  let service: FechaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FechaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
