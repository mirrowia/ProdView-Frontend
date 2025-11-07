import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderEstadisticas } from './header-estadisticas';

describe('HeaderEstadisticas', () => {
  let component: HeaderEstadisticas;
  let fixture: ComponentFixture<HeaderEstadisticas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderEstadisticas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderEstadisticas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
