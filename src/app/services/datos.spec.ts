import { TestBed } from '@angular/core/testing';

import { DatosService } from './datos';

describe('Datos', () => {
  let service: DatosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
