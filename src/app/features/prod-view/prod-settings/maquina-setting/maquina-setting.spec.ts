import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaquinaSetting } from './maquina-setting';

describe('MaquinaSetting', () => {
  let component: MaquinaSetting;
  let fixture: ComponentFixture<MaquinaSetting>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaquinaSetting]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaquinaSetting);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
