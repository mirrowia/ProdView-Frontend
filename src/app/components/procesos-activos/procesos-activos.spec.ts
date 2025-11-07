import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcesosActivos } from './procesos-activos';

describe('ProcesosActivos', () => {
  let component: ProcesosActivos;
  let fixture: ComponentFixture<ProcesosActivos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcesosActivos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcesosActivos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
