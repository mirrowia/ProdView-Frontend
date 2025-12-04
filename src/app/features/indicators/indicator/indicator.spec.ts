import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Indicator } from './indicator';

describe('Indecator', () => {
  let component: Indicator;
  let fixture: ComponentFixture<Indicator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Indicator]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Indicator);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
