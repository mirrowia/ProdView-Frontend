import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServidorSetting } from './servidor-setting';

describe('ServidorSetting', () => {
  let component: ServidorSetting;
  let fixture: ComponentFixture<ServidorSetting>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServidorSetting]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServidorSetting);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
