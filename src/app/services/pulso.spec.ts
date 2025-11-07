import { TestBed } from '@angular/core/testing';

import { Pulso } from './pulso';

describe('Pulso', () => {
  let service: Pulso;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Pulso);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
