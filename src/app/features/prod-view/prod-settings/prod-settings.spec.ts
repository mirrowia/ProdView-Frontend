import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdSettings } from './prod-settings';

describe('ProdSettings', () => {
  let component: ProdSettings;
  let fixture: ComponentFixture<ProdSettings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdSettings]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdSettings);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
