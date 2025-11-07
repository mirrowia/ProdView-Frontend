import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticasTurno } from './estadisticas-turno';

describe('EstadisticasTurno', () => {
  let component: EstadisticasTurno;
  let fixture: ComponentFixture<EstadisticasTurno>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstadisticasTurno]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstadisticasTurno);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
